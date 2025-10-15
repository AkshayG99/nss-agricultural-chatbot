class NSSChatbot {
    constructor() {
        console.log('NSSChatbot constructor called');
        this.chatMessages = document.getElementById('chatMessages');
        this.userInput = document.getElementById('userInput');
        this.sendButton = document.getElementById('sendButton');

        console.log('DOM elements:', { chatMessages: this.chatMessages, userInput: this.userInput, sendButton: this.sendButton });

        if (!this.chatMessages || !this.userInput || !this.sendButton) {
            console.error('Required DOM elements not found!');
            return;
        }

        this.initializeEventListeners();
        this.addWelcomeMessage();
    }

    initializeEventListeners() {
        console.log('Initializing event listeners');
        // Send message on button click
        this.sendButton.addEventListener('click', () => {
            console.log('Send button clicked');
            this.sendMessage();
        });

        // Send message on Enter key
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                console.log('Enter key pressed');
                this.sendMessage();
            }
        });

        // Auto-resize input
        this.userInput.addEventListener('input', () => {
            this.userInput.style.height = 'auto';
            this.userInput.style.height = this.userInput.scrollHeight + 'px';
        });
    }

    addWelcomeMessage() {
        const welcomeMessage = {
            type: 'bot',
            content: `🌟 Welcome to NSS AgriBot! 🌟

I'm your expert agricultural assistant for space settlements. I can help you with:

🚀 **Hydroponics** - Soil-less plant cultivation
🌫️ **Aeroponics** - Air-based growing systems
🌱 **Terra Preta** - Biochar soil enhancement
🌿 **ITEK** - Indigenous Traditional Ecological Knowledge

Ask me anything about sustainable farming in space environments!`
        };
        this.displayMessage(welcomeMessage);
    }

    async sendMessage() {
        console.log('sendMessage called');
        const message = this.userInput.value.trim();

        if (!message) return;

        console.log('Sending message:', message);

        // Display user message
        const userMessage = {
            type: 'user',
            content: message
        };
        this.displayMessage(userMessage);

        // Clear input
        this.userInput.value = '';
        this.userInput.style.height = 'auto';

        // Show typing indicator
        this.showTypingIndicator();

        try {
            // Send to API
            console.log('Making API call to /api/chat');
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message })
            });

            console.log('API response status:', response.status);

            if (!response.ok) {
                throw new Error(`API request failed: ${response.status}`);
            }

            const data = await response.json();
            console.log('API response data:', data);

            // Remove typing indicator
            this.hideTypingIndicator();

            // Display bot response
            const botMessage = {
                type: 'bot',
                content: data.response
            };
            this.displayMessage(botMessage);

        } catch (error) {
            console.error('Error:', error);
            this.hideTypingIndicator();

            const errorMessage = {
                type: 'bot',
                content: '❌ Sorry, I encountered an error. Please make sure the server is running and try again. If the problem persists, check that your Gemini API key is valid and has the necessary permissions.'
            };
            this.displayMessage(errorMessage);
        }
    }

    displayMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${message.type}-message`;

        const avatarElement = document.createElement('div');
        avatarElement.className = 'message-avatar';
        avatarElement.textContent = message.type === 'bot' ? '🤖' : '👤';

        const contentElement = document.createElement('div');
        contentElement.className = 'message-content';

        // Handle markdown-like formatting
        contentElement.innerHTML = this.formatMessage(message.content);

        messageElement.appendChild(avatarElement);
        if (message.type === 'user') {
            messageElement.appendChild(contentElement);
        } else {
            messageElement.appendChild(contentElement);
        }

        this.chatMessages.appendChild(messageElement);
        this.scrollToBottom();
    }

    formatMessage(content) {
        return content
            // Bold text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            // Line breaks
            .replace(/\n/g, '<br>');
    }

    showTypingIndicator() {
        const typingElement = document.createElement('div');
        typingElement.className = 'message bot-message typing-indicator';
        typingElement.id = 'typingIndicator';

        const avatarElement = document.createElement('div');
        avatarElement.className = 'message-avatar';
        avatarElement.textContent = '🤖';

        const contentElement = document.createElement('div');
        contentElement.className = 'message-content';
        contentElement.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';

        typingElement.appendChild(avatarElement);
        typingElement.appendChild(contentElement);

        this.chatMessages.appendChild(typingElement);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NSSChatbot();
});

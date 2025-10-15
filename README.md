# 🌱 NSS Agricultural Chatbot

A space-themed AI chatbot for agricultural questions in space settlements using hydroponics, aeroponics, Terra Preta, and Indigenous Traditional Ecological Knowledge (ITEK).

## 🚀 Features

- **Space-themed UI** with animated starfield background
- **Gemini LLM Integration** for intelligent agricultural insights
- **Context-aware responses** for space settlement farming
- **Real-time chat interface** with typing indicators
- **Knowledge base cards** for key agricultural technologies
- **Responsive design** for all device sizes

## 🛠️ Technologies Used

- **Backend**: Node.js, Express.js
- **AI**: Google Gemini LLM API
- **Frontend**: HTML5, CSS3, JavaScript
- **Styling**: Space-themed animations and gradients

## 📋 Prerequisites

- Node.js (v14 or higher)
- Google Gemini API key

## ⚙️ Setup Instructions

1. **Clone or download the project files**

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Gemini API key**:
   - Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Update the `.env` file:
     ```
     GEMINI_API_KEY=your_actual_api_key_here
     PORT=3000
     ```

   **Note**: Make sure your Gemini API key has the necessary permissions for the `gemini-pro` model.

4. **Start the server**:
   ```bash
   npm start
   ```

5. **Open your browser** and navigate to `http://localhost:3000`

## 🌌 Supported Knowledge Areas

- **Hydroponics**: Soil-less plant cultivation using nutrient solutions
- **Aeroponics**: Plants grown in air with misted nutrients (90% less water usage)
- **Terra Preta**: Biochar-enriched soil for enhanced fertility and carbon sequestration
- **ITEK**: Indigenous Traditional Ecological Knowledge for sustainable resource management

## 🎯 Usage

Simply type your agricultural questions in the chat interface. The AI will provide context-aware responses considering space settlement constraints like resource limitations and closed-loop systems.

**Example questions**:
- "How do I set up a hydroponic system in low gravity?"
- "What are the benefits of aeroponics for space farming?"
- "How can I create Terra Preta in a controlled environment?"
- "What traditional ecological knowledge applies to space agriculture?"

## 🔧 Development

To run in development mode with auto-restart:
```bash
npm run dev
```

## 📁 Project Structure

```
NSS_Chatbot/
├── index.html      # Main HTML file with space-themed UI
├── styles.css      # Space-themed CSS with animations
├── script.js       # Chatbot functionality and API integration
├── server.js       # Express server with Gemini API integration
├── package.json    # Dependencies and scripts
└── .env           # Environment variables (add your API key here)
```

## 🚨 Troubleshooting

- **"Failed to get response from AI"**: Check your Gemini API key in the `.env` file and ensure it has permissions for the `gemini-pro` model
- **"Model not found" errors**: The application uses the `gemini-pro` model which should be available with a valid API key
- **Server not starting**: Ensure all dependencies are installed with `npm install` and no other process is using port 3000
- **CORS errors**: The server is configured to allow all origins

## 🌟 Future Enhancements

- Voice input/output capabilities
- Multi-language support
- Advanced knowledge base with search
- Integration with agricultural sensors
- Mobile app version

## 📄 License

This project is open source and available under the MIT License.

---

**Ready to explore sustainable agriculture in space? Start asking questions! 🚀🌱**

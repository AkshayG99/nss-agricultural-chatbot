require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname)));

// Agricultural knowledge base for context
const agriculturalKnowledge = {
  hydroponics: "Hydroponics is a method of growing plants without soil, using mineral nutrient solutions in water. In space settlements, it's ideal for resource efficiency.",
  aeroponics: "Aeroponics is a plant cultivation technique where plant roots are suspended in air and misted with nutrient solution. It uses 90% less water than traditional farming.",
  terraPreta: "Terra Preta is a type of very dark, fertile soil found in the Amazon basin, created by indigenous peoples through biochar and organic matter addition.",
  itek: "Indigenous and Traditional Ecological Knowledge (ITEK) encompasses traditional knowledge about ecosystems, sustainability, and resource management passed down through generations."
};

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Create context-aware prompt for agricultural questions in space settlement context
    const contextPrompt = `
      You are an agricultural expert for a space settlement that uses hydroponics, aeroponics, Terra Preta, and Indigenous Traditional Ecological Knowledge (ITEK).

      Key technologies in our settlement:
      - Hydroponics: Soil-less plant cultivation using nutrient solutions
      - Aeroponics: Plants grown in air with misted nutrients (very water-efficient)
      - Terra Preta: Biochar-enriched soil for enhanced fertility and carbon sequestration
      - ITEK: Traditional ecological knowledge for sustainable resource management

      Please provide helpful, accurate insights about agricultural questions, considering the space environment constraints like resource limitations, closed-loop systems, and sustainable practices.

      Question: ${message}

      Provide a comprehensive, practical response that considers the space settlement context.
    `;

    const result = await model.generateContent(contextPrompt);
    const response = await result.response;
    const text = response.text();

    res.json({ response: text });
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    res.status(500).json({ error: 'Failed to get response from AI' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'NSS Agricultural Chatbot API is running' });
});

// Serve the main HTML file for any unmatched routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 NSS Agricultural Chatbot server running on port ${PORT}`);
  console.log(`💡 Ready to answer agricultural questions for space settlements!`);
  console.log(`🌐 Frontend available at http://localhost:${PORT}`);
});

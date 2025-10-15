const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

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
};

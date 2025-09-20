// Load environment variables from .env file
require('dotenv').config();

const express = require("express");
const fetch = require("node-fetch"); // keep this if Node < 18
const app = express();
app.use(express.json());

// Read API key from .env
const OPENAI_KEY = process.env.OPENAI_KEY;

if (!OPENAI_KEY) {
  console.error("❌ ERROR: OpenAI API key is missing! Add it in a .env file as OPENAI_KEY=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");
  process.exit(1);
}

app.post("/api/openai", async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) return res.status(400).json({ error: "Missing question" });

    const systemPrompt = `You are TutorBot: always explain step by step for students.`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${"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"}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: question },
        ],
        temperature: 0.2,
        max_tokens: 800,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    const answer = data.choices?.[0]?.message?.content || "No answer received.";
    res.json({ answer });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://192.168.1.46:${PORT}`);
});

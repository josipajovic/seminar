import express from "express";
import cors from "cors";
import OpenAI from "openai";
import 'dotenv/config';

const app = express();
app.use(express.json());
app.use(cors());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/chat-completion", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "The 'text' field is required in the request body." });
    }

    const chatCompletion = await getChatGptCompletion(text);

    const responseText = chatCompletion.choices[0]?.message?.content || "No response received.";

    res.json({ response: responseText });
  } catch (error) {
    console.error("Error handling chat completion:", error.message);
    res.status(500).json({ error: "Internal server error. Please try again later." });
  }
});

async function getChatGptCompletion(text) {

  const prompts = "Parafraziraj sljedeći tekst.\nTekst je na Hrvatskom jeziku.\n" +
                  "Parafraziraj u duhu hrvatskog jezika.\n Sa zadržavanjem istog smisla.\n" +
                  "<text>\n" + text + "</text>"

  const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompts }],
  });
  return response;
}

const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

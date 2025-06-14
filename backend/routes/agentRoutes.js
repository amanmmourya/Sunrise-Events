import express from 'express';
import fs from "fs";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage } from "@langchain/core/messages";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"; // Helps with chunking
import path from "path";

const router = express.Router();

router.post('/query', async (req, res) => {
  const promptR = req.body.prompt
  console.log(req.body.prompt)
  var result = {};
  try {

    async function processTxt(filePath) {
      const text = fs.readFileSync(filePath, "utf-8");

      // Split text into smaller chunks to improve processing
      const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 500, chunkOverlap: 100 });
      const chunks = await splitter.createDocuments([text]);

      return chunks.map(chunk => chunk.pageContent).join("\n\n"); // Merge chunks into a single prompt
    }

    async function run() {
      const filePath = path.join(process.cwd(), "info", "info.txt");
      const fullContext = await processTxt(filePath); // Get combined context from file

      const model = new ChatGoogleGenerativeAI({
        apiKey: process.env.GOOGLE_API_KEY,
        model: "gemini-1.5-flash",
        temperature: 0.3,
      });

      const prompt = `Use the following information as context:\n\n${fullContext}\n\n You are an ai assistant .Now, answer the following question based on the context provided to you ${promptR}`;
      result = await model.invoke([new HumanMessage(prompt)]);

    }

    await run();
    res.json({ response: result });
  } catch (err) {
    console.log(err);
    res.json({ response: "Sorry, something went wrong. Please try again." });
  }


})
export default router
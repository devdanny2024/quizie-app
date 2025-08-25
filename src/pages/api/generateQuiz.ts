import type { NextApiRequest, NextApiResponse } from 'next';

// Define the expected structure of the response from the AI
interface QuizQuestion {
    question: string;
    options: string[];
    answer: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Ensure the request is a POST request
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { topic, company, numQuestions } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;; // This is intentionally left empty; the environment provides the key.

  // The API endpoint for the Gemini Flash model
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

  try {
    // Construct a detailed prompt for the Gemini model
    const prompt = `
      You are an expert interviewer preparing a candidate for a job interview.
      Generate ${numQuestions} interview questions based on the following criteria:
      - Topic/Skill: "${topic || 'general knowledge'}"
      - Company: "${company || 'a leading tech company'}"

      For each question, provide:
      1. A "question" that an interviewer would ask.
      2. An array of three "options" which are short, bullet-point hints for the candidate to consider.
      3. An "answer" which is a short paragraph describing a suggested approach.

      Return the output as a valid JSON object with a single key "questions" that contains an array of these question objects.
      Example: {"questions": [{"question": "...", "options": ["...", "..."], "answer": "..."}]}
    `;

    // Define the JSON schema for the expected response
    const payload = {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            "questions": {
              type: "ARRAY",
              items: {
                type: "OBJECT",
                properties: {
                  "question": { "type": "STRING" },
                  "options": {
                    "type": "ARRAY",
                    "items": { "type": "STRING" }
                  },
                  "answer": { "type": "STRING" }
                },
                required: ["question", "options", "answer"]
              }
            }
          }
        }
      }
    };

    // Make the API call to the Gemini API
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Gemini API Error:", errorBody);
      throw new Error(`API request failed with status ${response.status}`);
    }

    const result = await response.json();
    
    // Extract the text content and parse it as JSON
    const jsonText = result.candidates[0].content.parts[0].text;
    const parsedJson = JSON.parse(jsonText);

    // The actual array is nested inside the "questions" key
    const questionsArray: QuizQuestion[] = parsedJson.questions || [];

    res.status(200).json(questionsArray);

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    res.status(500).json({ message: 'Failed to generate quiz questions.' });
  }
}

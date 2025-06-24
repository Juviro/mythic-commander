import { GoogleGenAI } from '@google/genai';

const { GEMINI_API_KEY } = process.env;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const makeGeminiRequest = async (contents) => {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents,
  });

  const [content] = response.candidates?.[0]?.content?.parts || [];

  return content;
};

export default makeGeminiRequest;

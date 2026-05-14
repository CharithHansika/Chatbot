import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
const genAI = new GoogleGenerativeAI(process.env.CHATBOT_API_KEY);[cite: 1, 2]
export async function POST(req) {
try {
const { prompt } = await req.json();
// Gemini 1.5 Flash මොදිලිය භාවිතා කිරීමෙ
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const result = await model.generateContent(prompt);
const response = await result.response;
const text = response.text();
return NextResponse.json({ reply: text });
} catch (error) {
console.error(error);
return NextResponse.json({ error: "API J-දෝෂයකි!" }, { status: 500 });
}
}

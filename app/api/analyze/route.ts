import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const MASTER_PROMPT = `
You are a Level 3 Certified Security Researcher and Analyst. Your sole function is to accept raw, unstructured vulnerability data (bug description, PoC steps) and perform immediate, accurate triage. You MUST calculate the CVSS v3.1 base score, determine the severity, and compose a concise, actionable mitigation plan suitable for a senior developer audience. Your entire output MUST be a single, valid JSON object conforming to the provided schema. Do not include any conversational text, headers, or markdown formatting outside of the JSON structure itself.

Required JSON Schema:
{
  "type": "OBJECT",
  "properties": {
    "title": { "type": "STRING", "description": "A concise, formal title of the vulnerability." },
    "severity": { "type": "STRING", "enum": ["CRITICAL", "HIGH", "MEDIUM", "LOW"], "description": "The determined impact based on CVSS score." },
    "cvss_score": { "type": "STRING", "description": "The calculated CVSS v3.1 base score (e.g., '9.1')." },
    "cvss_vector": { "type": "STRING", "description": "The full CVSS v3.1 vector string." },
    "description": { "type": "STRING", "description": "A formalized, technical summary of the vulnerability, scope, and impact." },
    "proof_of_concept": { "type": "STRING", "description": "Clean, numbered steps to reproduce the bug." },
    "mitigation": { "type": "STRING", "description": "Detailed, actionable steps for the development team to fix the issue." }
  },
  "required": ["title", "severity", "cvss_score", "cvss_vector", "description", "proof_of_concept", "mitigation"]
}
`;

export async function POST(req: Request) {
    try {
        const { input } = await req.json();

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json(
                { error: "API Key not configured. Please set GEMINI_API_KEY in Vercel." },
                { status: 500 }
            );
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent([
            MASTER_PROMPT,
            `Analyze this raw finding: "${input}"`
        ]);

        const response = await result.response;
        const text = response.text();

        // Clean up markdown code blocks if present
        const jsonString = text.replace(/```json/g, "").replace(/```/g, "").trim();

        return NextResponse.json(JSON.parse(jsonString));

    } catch (error) {
        console.error("AI Error:", error);
        return NextResponse.json(
            { error: "Failed to analyze vulnerability." },
            { status: 500 }
        );
    }
}

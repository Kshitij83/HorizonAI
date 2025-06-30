import { gemini, openai } from "inngest";
import { inngest } from "./client";
import { createAgent, anthropic } from "@inngest/agent-kit";
import ImageKit from "imagekit";
import { create } from "domain";
import { parse } from "path";
import { HistoryTable } from "@/configs/schema";
import { db } from "@/configs/db";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);

export const AiCareerChatAgent = createAgent({
  name: "HorizonAI",
  description:
    "An AI career coach agent that helps users with career advice, job search, and professional development.",
  system: `You are HorizonAI, an AI career coach agent. Your role is to assist users with career advice, job search strategies, and professional development. You provide personalized guidance based on the user's background, skills, and career goals. Always be supportive, encouraging, and informative. Always respond with clarity. If you don't know the answer to a question, it's okay to say so.`,
  model: gemini({
    model: "gemini-2.5-flash-lite-preview-06-17",
    apiKey: process.env.GEMINI_API_KEY,
  }),
});

export const AiResumeAnalyzerAgent = createAgent({
  name: "AiResumeAnalyzerAgent",
  description: "An AI agent that analyzes resumes and provides feedback.",
  system: `You are an advanced AI Resume Analyzer Agent.
Your task is to evaluate a candidate's resume and return a detailed analysis in the following structured JSON schema format.
The schema must match the layout and structure of a visual UI that includes overall score, section scores, summary feedback, improvement tips, strengths, and weaknesses.
INPUT: I will provide a plain text resume.
GOAL: Output a JSON report as per the schema below. The report should reflect:
{
  "overall_score": 85,
  "overall_feedback": "Excellent!",
  "summary_comment": "Your resume is strong, but there are areas to refine.",
  "sections": {
    "contact_info": {
      "score": 95,
      "comment": "Perfectly structured and complete."
    },
    "experience": {
      "score": 88,
      "comment": "Strong bullet points and impact."
    },
    "education": {
      "score": 70,
      "comment": "Consider adding relevant coursework."
    },
    "skills": {
      "score": 60,
      "comment": "Expand on specific skill proficiencies."
    }
  },
  "improvement_tips": [
    "Add more numbers and metrics to your experience section to show impact.",
    "Integrate more industry-specific keywords relevant to your target roles.",
    "Start bullet points with strong action verbs to make your achievements stand out."
  ],
  "whats_good": [
    "Clean and professional formatting.",
    "Clear and concise contact information.",
    "Relevant work experience."
  ],
  "needs_improvement": [
    "Skills section lacks detail",
    "Some experience bullet points could be stronger.",
    "Missing a professional summary/objective."
  ]
}`,
  model: gemini({
    model: "gemini-2.5-flash-lite-preview-06-17",
    apiKey: process.env.GEMINI_API_KEY,
  }),
});

export const AiCareerAgent = inngest.createFunction(
  { id: "ai-career-agent" },
  { event: "AiCareerAgent" },
  async ({ event, step }) => {
    const { userInput } = await event?.data;
    const result = await AiCareerChatAgent.run(userInput);
    return result;
  }
);

var imagekit = new ImageKit({
  //@ts-ignore
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  //@ts-ignore
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  //@ts-ignore
  urlEndpoint: process.env.IMAGEKIT_ENDPOINT_URL,
});

export const AiResumeAgent = inngest.createFunction(
  { id: "ai-resume-agent" },
  { event: "AiResumeAgent" },
  async ({ event, step }) => {
    const { recordId, base64ResumeFile, pdfText, aiAgentType, userEmail } =
      await event.data;
    const uploadFileUrl = await step.run("uploadImage", async () => {
      const imageKitFile = await imagekit.upload({
        file: base64ResumeFile,
        fileName: `${Date.now()}.pdf`,
        isPublished: true,
      });
      return imageKitFile.url;
    });
    const aiResumeReport = await AiResumeAnalyzerAgent.run(pdfText);
    //@ts-ignore
    const rawContent = aiResumeReport.output[0]?.content;
    const rawContentJson = rawContent.replace("```json", "").replace("```", "");
    const parseJson = JSON.parse(rawContentJson);
    //return parseJson;

    const saveToDb = await step.run("SaveToDb", async () => {
      const result = await db.insert(HistoryTable).values({
        recordId: recordId,
        content: parseJson,
        aiAgentType: aiAgentType,
        createdAt: new Date().toString(),
        userEmail: userEmail,
        metaData: uploadFileUrl
      });
      console.log("Saved to DB:", result);
      return parseJson;
    });
  }
);

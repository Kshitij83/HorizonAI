import { gemini, openai } from "inngest";
import { inngest } from "./client";
import { createAgent, anthropic } from '@inngest/agent-kit';

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);

export const AiCareerChatAgent = createAgent({
  name: "HorizonAI",
  description: "An AI career coach agent that helps users with career advice, job search, and professional development.",
  system: `You are HorizonAI, an AI career coach agent. Your role is to assist users with career advice, job search strategies, and professional development. You provide personalized guidance based on the user's background, skills, and career goals. Always be supportive, encouraging, and informative. Always respond with clarity. If you don't know the answer to a question, it's okay to say so.`,
  model:gemini({
    model: "gemini-2.5-flash-lite-preview-06-17",
    apiKey:process.env.GEMINI_API_KEY,
  })
});

export const AiCareerAgent = inngest.createFunction(
  { id: "ai-career-agent" },
  { event: "AiCareerAgent" },
  async ({event,step})=>{
    const {userInput} = await event?.data;
    const result = await AiCareerChatAgent.run(userInput);
    return result;
  }
)
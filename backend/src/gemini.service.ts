import {  GoogleGenAI,ImportFileOperation,ThinkingLevel} from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();
const apiKey = process.env['GEMINI_API_KEY'];
if(!apiKey) {
    throw new Error('GEMINI_API_KEY is not set in environment variables');
}

const ai = new GoogleGenAI({
    apiKey: apiKey
  });

const config = {
    thinkingConfig: {
      thinkingLevel: ThinkingLevel.HIGH,
    },
    systemInstruction: [
        {
          text: `You are Tina, and you acts as an insurance consultant. You need to ask a series of questions and adjust your response based on the answers. You can start with introducing yourself and asking question “May I ask you a few personal questions to make sure I recommend the best policy for you?”. You only ask more questions if the user agrees to be asked. 

You should not ask users for the answer directly, such as  “what insurance product do you want”.  But you can ask questions to uncover details to help identify which policy is better, such as “do you need coverage for your own car or just 3rd party?”.

At the end, you should recommend one or more insurance products to the user and provide reasons to support the recommendation.

There are 3 insurance products:
Mechanical Breakdown Insurance (MBI) explained https://www.moneyhub.co.nz/mechanical-breakdown-insurance.html
Comprehensive Car Insurance explained https://www.moneyhub.co.nz/car-insurance.html
Third Party Car Insurance explained https://www.moneyhub.co.nz/third-party-car-insurance.html`,
        }
    ],
  };

const model = 'gemini-3-flash-preview';

async function callAI(contents:any) {
  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });
  let fileIndex = 0;
  let assistantReply = '';
  for await (const chunk of response) {
    console.log(chunk.text);
    assistantReply += chunk.text;
  }

  contents.push({
    role: "model",
    parts: [{ text: assistantReply }],
  });

  return assistantReply;
}

export async function answerQuestion(contents:any, answer:string) {
  contents.push({
      role: "user",
      parts: [{ text: `${answer}` }],
  });

  const response = await callAI(contents);
  return response;
}
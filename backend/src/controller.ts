import { type Request, type Response } from "express";
import {answerQuestion} from './gemini.service.ts';

const contentsStore: Map<string, any> = new Map();

export const index = (req: Request, res: Response) => {
    res.send('API is running! 🚀');
}

export const startChat = async (req: Request, res: Response) => {
    const contents: any = [];

    const chatId = Date.now().toString();
    contentsStore.set(chatId, contents);

    try {
    const reply = await answerQuestion(contents, `Hello, I am looking for car insurance. Can you help me?`);

    console.log(contents);
    res.status(200).json({ chatId, reply });
    } catch (error) {       
        console.error('Error in startChat:', error);    
        res.status(500).send(error instanceof Error ? error.message : 'An unknown error occurred');
    }
}

export const replyChat = async (req: Request, res: Response) => {
    const { chatId, answer } = req.body;
    if (!chatId || !answer) {
        res.status(400).send('chatId and answer are required');
        return;
    }

    const contents = contentsStore.get(chatId);
    if (!contents) {
        res.status(404).send('Chat not found');
        return;
    }

    try {
    const reply = await answerQuestion(contents, answer);

    console.log(contents);
    res.status(200).json({ reply });
    } catch (error) {       
        console.error('Error in replyChat:', error);    
        res.status(500).send(error instanceof Error ? error.message : 'An unknown error occurred');
    }
}
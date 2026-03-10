import { Router } from "express";
import { index, startChat, replyChat } from "./controller.ts";

const router = Router()

router.get('/',index);
router.get('/start-chat', startChat);
router.post('/reply-chat', replyChat);

export {router}

import { Router } from "express";
import { index, startChat, replyChat } from "./controller.js";

const router = Router()

router.get('/',index);
router.get('/start-chat', startChat);
router.post('/reply-chat', replyChat);

export {router}

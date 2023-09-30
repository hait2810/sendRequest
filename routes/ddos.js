import express from 'express'
import { sendDdos } from '../controllers/ddos'
const router = express.Router()


router.get("/ddos", sendDdos)

export default router
import express from "express";
import { test } from "../controllers/test.controller.js";

const router = express.Router()


router.get('/api/test',test)


export default router
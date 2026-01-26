import express from 'express';
import { geyMyName } from '../controller/my.controller.js';

const router = express.Router();

router.post('/myName',geyMyName);

export default router;
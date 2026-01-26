import express from 'express';
import { getMyFullName, geyMyName } from '../controller/my.controller.js';

const router = express.Router();

router.post('/myName',geyMyName);
router.post('/fullName',getMyFullName);

export default router;
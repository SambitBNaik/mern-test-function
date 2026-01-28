import express from 'express';
import { createProduct, deleteProduct, getProductById, getProducts, getProductStats, updateProduct } from '../controller/product.controller.js';

const router = express.Router();

router.post("/",createProduct);
router.get("/",getProducts);
router.get("/stats", getProductStats);
router.get("/:id", getProductById);
router.put("/:id",updateProduct);
router.delete("/:id",deleteProduct);

export default router;
import express from 'express';
const router = express.Router();

import { requireSignin, isAdmin, isAuth } from '../controllers/auth';
import { userById } from '../controllers/user';
import { createcate, listcate, read, remove, update, categoryById } from "../controllers/category";

router.post("/category", createcate);
router.get("/category/:categoryId", read);
router.delete("/category/:categoryId", remove);
// router.put("/category/:categoryId/:userId", update);
router.put("/category/:categoryId", update);
router.get("/categories", listcate);

router.param("userId", userById);
router.param("categoryId", categoryById);

module.exports = router;
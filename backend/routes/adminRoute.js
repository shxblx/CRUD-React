import express from "express";
import {
  authAdmin,
  adminLogout,
  getUsers,
} from "../controller/adminController.js";
import { adminProtect } from "../middleware/adminAuthMiddleware.js";
import upload from "../middleware/multer.js";
const adminRouter = express.Router();

adminRouter.post("/", authAdmin);
adminRouter.post("/logout", adminLogout);
adminRouter.route("/users").get(adminProtect, getUsers);

export default adminRouter;

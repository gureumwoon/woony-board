import express from "express";
import { watch, deleteBoard, getUpload, postUpload, getEdit, postEdit } from "../controllers/boardController";

const boardRouter = express.Router();

boardRouter.get("/:id([0-9a-f]{24})", watch);
boardRouter.route("/upload").get(getUpload).post(postUpload);
boardRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
boardRouter.route("/:id(\[0-9a-f]{24})/delete").get(deleteBoard);

export default boardRouter;
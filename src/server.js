import express from "express";
import path from "path";
import morgan from "morgan";
import methodOverride from "method-override";
import globalRouter from "./routers/globalRouter";
import boardRouter from "./routers/boardRouter";
import userRouter from "./routers/userRouter";

console.log(process.cwd());

const app = express();
const logger = morgan("dev");

app.set('views', path.join(__dirname, './views'));
app.set("view engine", "ejs")
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use("/", globalRouter);
app.use("/boards", boardRouter);
app.use("/users", userRouter);

export default app;


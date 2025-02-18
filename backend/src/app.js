import express from "express";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/error.middleware.js";
import cors from "cors";
import _config from "./config/config.js";
import path from "path";
const app = express();
const _dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: _config.cors_origin
  })
);
app.use(
  express.urlencoded({
    extended: true
  })
);

// all routes
import userRouter from "./routes/user.router.js";
import matchRouter from "./routes/match.router.js";
app.use("/api/v1/user", userRouter);
app.use("/api/v1", matchRouter);

app.use(express.static(path.join(_dirname, "/frontend/dist")));

app.get("*", (_, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});

app.use(errorMiddleware);
export default app;

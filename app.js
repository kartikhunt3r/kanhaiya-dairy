import express, { json, urlencoded } from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";

const port = process.env.PORT || 3000;

const app = express();

// Middlewares

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Api is Working");
});

// Routes
import router from "./routes/index.js";
app.use(router);

app.listen(port, () => {
  console.log("Server is Working...");
});

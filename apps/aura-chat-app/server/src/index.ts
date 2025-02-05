import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { rootRouter } from "./routes";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "*",
  }),
);
app.use(express.json());

app.get("/", (req, res) => {
  try {
    res.status(200).send("Server is working");
  } catch (error) {
    res.status(500).send("Internal server found.");
  }
});
app.use("/api", rootRouter);
app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});

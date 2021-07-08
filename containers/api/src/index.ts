import express from 'express';
import { mongo } from './mongo';
import cors from "cors";

const app = express();

if (process.env.LOCAL === "dev") {
  app.use(cors({
    origin: "http://localhost:8000"
  }));
}

app.get("/", (req, res) => {
  res.status(200).send("All good on the root!");
});

app.get("/mongo", async (req, res) => {
  const db = await mongo();

  res.status(200).send("Db is alive!");
})

app.listen(4000, () => {
  console.log(`API running on port 4000`);
});
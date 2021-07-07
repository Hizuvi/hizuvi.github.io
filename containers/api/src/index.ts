import express from 'express';
import { mongo } from './mongo';

const app = express();

app.get("/", (req, res) => {
  res.status(200).send("All good!");
});

app.get("/mongo", async (req, res) => {
  const db = await mongo();
  
  res.status(200).send("All good!");
})

app.listen(4000, () => {
  console.log(`server running on port 4000`);
});
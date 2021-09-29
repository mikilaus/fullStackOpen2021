import express from "express";
import { calculateBmi } from "./bmiCalculator";
const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  console.log(req.query);
  let queries: { [key: string]: any } = req.query;
  let bmiData = calculateBmi(Number(queries.height), Number(queries.weight));

  if (!bmiData.weight || !bmiData.height) {
    throw new Error("malformatted parameters");
  }

  try {
    res.json(bmiData);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

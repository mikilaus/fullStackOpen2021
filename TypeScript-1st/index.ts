import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  console.log(req.query);
  const queries = req.query;
  const bmiData = calculateBmi(Number(queries.height), Number(queries.weight));

  if (!bmiData.weight || !bmiData.height) {
    throw new Error("malformatted parameters");
  }

  try {
    res.json(bmiData);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/exercises", (req, res) => {
  interface reqData {
    daily_exercises: number[];
    target: number;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data: reqData = req.body;
  console.log(req.body);
  if (!data.target || !data.daily_exercises) {
    throw new Error("parameters missing");
  }

  try {
    const result = calculateExercises(data.daily_exercises, data.target);
    res.json(result);
  } catch (error) {
    res.send(error);
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

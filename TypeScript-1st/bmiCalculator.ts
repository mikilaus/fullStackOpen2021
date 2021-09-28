interface bmiValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: Array<string>): bmiValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateBmi = (height: number, weight: number) => {
  let bmi: number = Number((weight / ((height * height) / 10000)).toFixed(2));

  if (bmi < 18.6) {
    console.log("Under Weight");
  } else if (bmi >= 18.6 && bmi < 24.9) {
    console.log("Normal Weight");
  } else {
    console.log("Over Weight");
  }
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  calculateBmi(value1, value2);
} catch (error) {
  console.log("Error, something bad happened, message: ", error.message);
}

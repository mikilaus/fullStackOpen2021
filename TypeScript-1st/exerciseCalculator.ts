interface calcValues {
  valuesArray: Array<number>;
  targetValue: number;
}

const parseCalcArguments = (args: Array<string>): calcValues => {
  let values = args.map((arg) => Number(arg));
  let slicedArray = values.slice(2, values.length - 1);
  let target = values[values.length - 1];

  return {
    valuesArray: slicedArray,
    targetValue: target,
  };
};

interface statistics {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  values: Array<number>,
  target: number
): statistics => {
  let trainedDays = values.filter((v) => v !== 0);
  let sumOfDays = trainedDays.reduce((a, b) => a + b, 0);
  let average = sumOfDays / values.length || 0;

  let rating = (): number => {
    if (average < target - 1) {
      return 1;
    } else if (average > target) {
      return 3;
    } else {
      return 2;
    }
  };

  let ratingDescription = (rating: number): string => {
    switch (rating) {
      case 1:
        return "its not enough work to achieve your goal";

      case 2:
        return "not too bad but could be better";

      default:
        return "Excellent job!";
    }
  };

  return {
    periodLength: values.length,
    trainingDays: trainedDays.length,
    success: average < target ? false : true,
    rating: rating(),
    ratingDescription: ratingDescription(rating()),
    target: target,
    average: average,
  };
};

try {
  const { valuesArray, targetValue } = parseCalcArguments(process.argv);
  console.log(calculateExercises(valuesArray, targetValue));
} catch (error) {
  console.log(error);
}

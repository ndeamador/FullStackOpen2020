interface ParsedArguments {
  height: number;
  weight: number;
}

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / ((height / 100) ^ 2);

  if (bmi < 15) return "Very severely underweight";
  else if (bmi < 16) return "Severely underweight";
  else if (bmi < 18.5) return "Underweight";
  else if (bmi < 25) return "Normal (healthy weight)";
  else if (bmi < 30) return "Overweight";
  else if (bmi < 35) return "Obese Class I (Moderately obese)";
  else if (bmi < 40) return "Obese Class II (Severely obese)";
  else if (bmi >= 40) return "Obese Class III (Very severely obese)";

  // The property noImplicitReturns in tsconfig requires an ending return statement.
  return "default";
};

const parseArguments = (args: Array<string>): ParsedArguments => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};


// To prevent that this code block gets executed when importing functions from main, we wrap it for it to be only executed when run directly:
// Otherwise it is run everytime a function is imported and it causes unwanted behaviour (including typescript errors)
if (require.main === module) {
  try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
  }
  catch (err) {
    if (err instanceof Error) {
      console.log('Something went wrong: ', err.message);
      throw err;
    } else {
      console.log('The argument passed to the error handler is not of type Error. The passed argument is: ', err);
    }
  }
}
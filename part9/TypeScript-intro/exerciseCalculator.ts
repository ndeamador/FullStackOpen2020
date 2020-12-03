// A fix to prevent that variables are declared as global
// This is to prevent conflicts with parseArguments, which is used in other files.
export { };

interface ResultObject {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: 1 | 2 | 3 | undefined,
  ratingDescription: string,
  target: number,
  average: number
}

interface ParsedArguments {
  targetDailyHours: number,
  dailyHours: Array<number>
}

const calculateExercises = (targetDailyHours: number, dailyHours: Array<number>): ResultObject => {

  const periodLength: number = dailyHours.length;
  const averageDailyHours: number = dailyHours.reduce((acc, currentDayHours) => acc + currentDayHours) / periodLength;

  let rating: 1 | 2 | 3 | undefined = undefined;
  let message = '';

  if (averageDailyHours < 1) {
    message = 'You need to work harder';
    rating = 1;
  }
  else if (averageDailyHours < 2) {
    message = 'Not too bad but could be better';
    rating = 2;
  }
  else if (averageDailyHours >= 2) {
    message = 'Good job!';
    rating = 3;
  }

  return {
    periodLength: periodLength,
    trainingDays: dailyHours.filter(day => day !== 0).length,
    success: averageDailyHours >= targetDailyHours ? true : false,
    rating: rating,
    ratingDescription: message,
    target: targetDailyHours,
    average: averageDailyHours
  };
};


const parseArguments = (args: Array<string>): ParsedArguments => {

  if (args.length < 4) throw new Error('Not enough arguments');

  const argsAreNumbers: boolean = args.reduce((_result, arg, i) => {
    if (i > 2) {
      return !isNaN(Number(arg)) ? true : false;
    } else {
      return false;
    }
  }, false);

  if (argsAreNumbers) {
    return {
      targetDailyHours: Number(args[2]),
      dailyHours: (args.filter((_arg, i) => i > 2)).map(arg => Number(arg))
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};


try {
  const { targetDailyHours, dailyHours } = parseArguments(process.argv);
  console.log(calculateExercises(targetDailyHours, dailyHours));
}
catch (err) {
  console.log('Something went wrong: ', err.message);
}
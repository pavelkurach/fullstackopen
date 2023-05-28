interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  dailyExerciseHours: Array<number>,
  target: number,
): Result => {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter((hours) => hours > 0).length;
  const average = dailyExerciseHours.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= target;
  const rating = success ? 3 : average >= target - 1 ? 2 : 1;
  const ratingDescription = success
    ? 'good'
    : average >= target - 1
    ? 'not too bad but could be better'
    : 'bad';
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

const parseArgumentsExercises = (
  args: Array<string>,
): [Array<number>, number] => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const target = Number(args[2]);
  const dailyExerciseHours = args.slice(3).map((hours) => Number(hours));
  if (!isNaN(target) && dailyExerciseHours.every((hours) => !isNaN(hours))) {
    return [dailyExerciseHours, target];
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

try {
  const [dailyExerciseHours, target] = parseArgumentsExercises(process.argv);
  console.log(calculateExercises(dailyExerciseHours, target));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}

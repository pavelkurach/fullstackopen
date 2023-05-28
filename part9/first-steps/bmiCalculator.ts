type kg = number;
type cm = number;

const calculateBmi = (height: cm, weight: kg): string => {
  const bmi = weight / Math.pow(height / 100, 2);
  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi < 25) {
    return "Normal (healthy weight)";
  } else if (bmi < 30) {
    return "Overweight";
  } else {
    return "Obese";
  }
};

const parseArguments = (args: Array<string>): [cm, kg] => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return [Number(args[2]), Number(args[3])];
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

try {
  const [height, weight] = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (e) {
  let message = "unknwon error";
  if (e instanceof Error) {
    message = e.message;
  }
  console.log("Error, something bad happened, message: ", message);
}

export { calculateBmi };

interface Results {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseValues {
  value1: number[];
  value2: number;
}

const calculateExercises = (hours: number[], target: number): Results => {
  const descriptions: { [key: number]: string } = {
    1: 'bad',
    2: 'not too bad but could be better',
    3: 'great job!'
  };

  const trainingDays = hours.filter(h => h > 0).length;
  let rating: number = 1;
  const average: number = hours.reduce((sum, currentValue) => sum + currentValue, 0) / hours.length;
  
  if(average >= target - 0.5) {
    rating = 2;
  }

  let success = false;
  if(average >= target) {
    success = true;
    rating = 3;
  }

  return {
    periodLength: hours.length,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: descriptions[rating],
    target: target,
    average: average
  };
};

const parseExerciseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const hours = [];
  for (const element of args.slice(3)) {
    if (!isNaN(Number(element))) {
      hours.push(Number(element));
    } else {
      throw new Error('Provided values were not numbers!');
    }
  }

  return {
    value1: hours,
    value2: Number(args[2])
  };
};

try {
  const { value1, value2 } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(value1, value2));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

export default calculateExercises;
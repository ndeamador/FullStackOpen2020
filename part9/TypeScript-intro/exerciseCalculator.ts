
interface ResultObject {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: 1 | 2 | 3,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (dailyHours: Array<number>, targetDailyHours: number):ResultObject => {

  const periodLength: number = dailyHours.length
  const averageDailyHours: number = dailyHours.reduce((acc, currentDayHours) => acc + currentDayHours) / periodLength

  let rating: 1 | 2 | 3 = null
  let message: string = ''

  if (averageDailyHours < 1) {
    message = 'You need to work harder'
    rating = 1
  }
  else if (averageDailyHours < 2) {
    message = 'Not too bad but could be better'
    rating = 2
  }
  else if (averageDailyHours >= 2) {
    message = 'Good job!'
    rating = 3
  }

  return {
    periodLength: periodLength,
    trainingDays: dailyHours.filter(day => day !== 0).length,
    success: averageDailyHours >= targetDailyHours ? true : false,
    rating: rating,
    ratingDescription: message,
    target: targetDailyHours,
    average: averageDailyHours
  }
}

console.log('Reference execution: ', calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))

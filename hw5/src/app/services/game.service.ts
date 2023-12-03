import { type Answer } from '../models/types'

export async function getSetSize (setID: number): Promise<number> {
  const data = await fetch(`http://localhost:3000/api/setSize/${setID}`)
  const setSize: number = await data.json()
  console.log(setSize)
  return setSize
}

export async function getQuestionTitle (setID: number, questionID: number): Promise<string> {
  const data = await fetch(`http://localhost:3000/api/question/${setID}/${questionID}`)
  const questionTitle = await data.json()
  return questionTitle
}

export async function getAnswersTitle (setID: number, questionID: number): Promise<Answer[]> {
  const data = await fetch(`http://localhost:3000/api/answers/${setID}/${questionID}`)
  const answersTitle = await data.json()
  return answersTitle
}
export async function getCorrect (setID: number, questionID: number, answerID: number): Promise<number> {
  const data = await fetch(`http://localhost:3000/api/correct/${setID}/${questionID}`)
  const correctID = await data.json()
  return correctID
}

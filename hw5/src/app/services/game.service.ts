import { type Answer } from '../models/types'

export async function getSetSize (setID: number): Promise<number> {
  const data = await fetch(`http://localhost:3000/api/setSize/${setID}`)
  const setSize: number = await data.json()
  //  console.log для дебага или закоменченный код и прочий мусора лучше не оставлять в коде.
  // Если хочется оставить логирование в консоли (ну мало ли), лучше использовать console.debug
  // В остальных случаях такое лучше удалять
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
  // тут можно вот так, чтобы не создавать лишнюю переменную
  return await data.json()
}
export async function getCorrect (setID: number, questionID: number): Promise<number> {
  const data = await fetch(`http://localhost:3000/api/correct/${setID}/${questionID}`)
  const correctID = await data.json()
  return correctID
}

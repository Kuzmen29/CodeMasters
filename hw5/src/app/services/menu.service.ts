import { type PackageOfQuestions } from '../models/types'

export async function getSets (): Promise<PackageOfQuestions[]> {
  const data = await fetch('http://localhost:3000/api/sets')
  const sets = await data.json()
  return sets
}

import { type PackageOfQuestions, type SetItemHTMLDivElement } from './types'
import { Game } from './game'
import { getSets } from '../services/menu.service'

export async function start (): Promise<void> {
  const data: PackageOfQuestions[] = await getSets()

  const gameSets = document.querySelector('.menu__sets')

  let myGame: Game
  for (const item of data) {
    const setsItem: SetItemHTMLDivElement = document.createElement('div')
    setsItem.setID = item.id
    setsItem.textContent = item.set
    setsItem.classList.add('sets__item')
    gameSets?.append(setsItem)

    setsItem.addEventListener('click', (event) => {
      event.preventDefault()

      const eventTarget: any = event.target

      // clear()
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (myGame) {
        location.reload()
      }

      myGame = new Game(eventTarget.setID)
    })
  }
}

// function clear () {
//   const question = document.querySelector('.game__question')
//   if (question) {
//     question.remove()
//   }
//   const result = document.querySelector('.result')
//   if (result) {
//     result.remove()
//   }
//   const next = document.querySelector('.game__next')
//   const again = document.querySelector('.game__again')
//   again.classList.remove('again')
//   next.classList.remove('next')
// }

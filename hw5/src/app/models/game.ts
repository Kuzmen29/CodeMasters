import { type Answer, type SetItemHTMLDivElement } from '../models/types'

import { getSetSize, getQuestionTitle, getAnswersTitle, getCorrect } from '../services/game.service'
export class Game {
  private _points: number

  private _questionNumber: number
  private _NumberOfQuestions: number
  private _result: Element

  next = document.querySelector('.game__next')
  again = document.querySelector('.game__again')
  gameField = document.querySelector('.game__field')

  constructor (private readonly setID: number) {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.next?.addEventListener('click', async () => { await this.nextQuestion() })
    this.again?.addEventListener('click', () => { this.playAgain() })
    void this.init()
  }

  async init (): Promise<void> {
    this._points = 0
    this._questionNumber = 0
    this._NumberOfQuestions = await getSetSize(this.setID)
    await this.runGame()
  }

  async runGame (): Promise<void> {
    await this.createQuestion()
    this.next?.classList.add('next')
  }

  async nextQuestion (): Promise<void> {
    if (this._questionNumber < this._NumberOfQuestions) {
      console.log(2)
      await this.createQuestion()
      console.log(4)
    } else {
      console.log(5)
      this.next?.classList.remove('next')
      this.again?.classList.add('again')
      this.getResult()
    }
  }

  async createQuestion (): Promise<void> {
    this.deleteQuestion()

    const questionTitle: string = await getQuestionTitle(this.setID, this._questionNumber + 1)

    const answersTitle: Answer[] = await getAnswersTitle(this.setID, this._questionNumber + 1)

    const quest = document.createElement('div')
    quest.classList.add('game__question')
    quest.classList.add('question')

    if (this.gameField != null) {
      this.gameField.prepend(quest)
    }

    quest.insertAdjacentHTML('afterbegin', `
        <h1 class="question__title">${questionTitle}</h1>
        <div class="question__options"></div>
        `)

    const questionOptions = document.querySelector('.question__options')
    for (const answer of answersTitle) {
      const questionOption: SetItemHTMLDivElement = document.createElement('div')
      questionOption.classList.add('question__option')
      questionOption.textContent = answer.text
      questionOption.answerID = answer.id

      questionOptions?.insertAdjacentElement('beforeend', questionOption)
    }

    const questionOption = document.querySelectorAll('.question__option')

    questionOption.forEach(item => {
      item.addEventListener('click', (event) => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        (async (): Promise<void> => {
          const eventTarget: any = event.target

          const correctID = await getCorrect(this.setID, this._questionNumber + 1, eventTarget.answerID)
          console.log('! ' + correctID)
          if (eventTarget.answerID === correctID) {
            eventTarget.classList.add('question_true')
            ++this._points
          } else {
            eventTarget.classList.add('question_false')
            questionOption.forEach((item: any) => item.answerID === correctID ? item.classList.add('question_true') : 1)
          }
          ++this._questionNumber
        })()
      })
    })
  }

  deleteQuestion (): void {
    const question = document.querySelector('.question')
    if (question != null) {
      question.remove()
    } else {
      console.log(2)
    }
  }

  getResult (): void {
    console.log('result')
    this._result = document.createElement('div')
    this._result.innerHTML = `<h1 class='result__item'>Количество набранных очков <span class='result__value'>${this._points}</span> </h1> 
                            <h1 class='result__item'>Количество правильных ответов <span class='result__value'>${this._points}</span> из ${this._NumberOfQuestions}</h1>`
    this._result.classList.add('game__result')
    this._result.classList.add('result')
    this.gameField?.append(this._result)
  }

  deleteResult (): void {
    const result = document.querySelector('.result')
    if (result != null) {
      result.remove()
      console.log('delete result')
    }
  }

  playAgain (): void {
    this._points = 0
    this._questionNumber = 0
    this.deleteResult()
    this.again?.classList.remove('again')
    this.next?.classList.add('next')

    void this.nextQuestion()
  }

  endGame (): void {
    this.deleteResult()
    this.deleteQuestion()
    this.again?.classList.remove('again')
    this.next?.classList.remove('next')
  }
}

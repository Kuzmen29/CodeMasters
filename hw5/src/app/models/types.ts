export interface PackageOfQuestions {
  id: number // обычно не принято писать ковычки с названийми ключей,
  'set': string
  'questions': Question[]
}

export interface Question {
  'question': string
  'answers': Answer[]
}

export interface Answer {
  'id': number
  'text': string
  'correct'?: boolean
}

export interface SetItemHTMLDivElement extends HTMLDivElement {
  'setID'?: number
  'answerID'?: number
}



export interface PackageOfQuestions {
    "id":number,
    "set": string,
    "questions": Question[],
}

export interface Question {
    "question" : string,
    "answers" : Answer[],
}

export interface Answer {
    "id": number,
    "text": string,
    "correct": boolean,
}

export interface SetItemHTMLDivElement extends HTMLDivElement {
    "setItem"? : PackageOfQuestions;
    "answerOfQuestion"? : boolean
}
export interface SetItemEventTarget extends EventTarget {
    "setItem"? : PackageOfQuestions;
    "answerOfQuestion"? : boolean
}
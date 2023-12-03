export async function getSetSize(setID:number) {
    let data = await fetch(`http://localhost:3000/api/setSize/${setID}`);
    let setSize : number = await data.json()
    console.log(setSize);
    return setSize
}

export async function getQuestionTitle(setID:number, questionID : number) {
    let data  = await fetch(`http://localhost:3000/api/question/${setID}/${questionID}`);
    let questionTitle = await data.json();
    return questionTitle;
}

export async function getAnswersTitle(setID:number, questionID : number) {
    let data  = await fetch(`http://localhost:3000/api/answers/${setID}/${questionID}`);
    let answersTitle = await data.json();
    return answersTitle;
}
export async function getCorrect(setID:number, questionID : number, answerID : number) {
    let data  = await fetch(`http://localhost:3000/api/correct/${setID}/${questionID}`);
    let correctID = await data.json();
    return correctID;
}


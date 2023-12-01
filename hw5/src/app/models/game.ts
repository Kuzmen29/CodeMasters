import { PackageOfQuestions, Question, Answer, SetItemHTMLDivElement, SetItemEventTarget} from "../models/types";

export class Game {

    private _points : number;

    private _questions : Question[];
    private _questionNumber : number;
    private _NumberOfQuestions : number;
    private _result : Element;

    next = document.querySelector('.game__next');
    again = document.querySelector('.game__again');
    gameField = document.querySelector('.game__field');

    constructor(private PackageOfQuestions : PackageOfQuestions) {
        this._questions = this.PackageOfQuestions.questions;
        this._points = 0;
        this._questionNumber = 0;
        this._NumberOfQuestions = this._questions.length;
        this.runGame()

        this.next.addEventListener('click',()=> this.nextQuestion());
        this.again.addEventListener('click',()=> this.playAgain());
    }
    
    runGame(){
        this.createQuestion();
        this.next?.classList.add('next')
    }

    nextQuestion() {
        if (this._questionNumber < this._NumberOfQuestions) {
            console.log(2);
            this.createQuestion();
            console.log(4);
        }
        else {
            console.log(5);
            this.next?.classList.remove('next');
            this.again?.classList.add('again');
            this.getResult();
        }
    }
    
    createQuestion() {
        this.deleteQuestion();

        console.log(3);
        let question : Question = this._questions[this._questionNumber];
        let answers : Answer[] = question.answers;
        

        let quest = document.createElement('div');
        quest.classList.add('game__question');
        quest.classList.add('question');
        this.gameField.prepend(quest);

        quest.insertAdjacentHTML('afterbegin', `
        <h1 class="question__title">${question.question}</h1>
        <div class="question__options"></div>
        `);

        let questionOptions = document.querySelector('.question__options');
        for(let answer of answers) {
            let questionOption: SetItemHTMLDivElement = document.createElement('div');
            questionOption.classList.add('question__option');
            questionOption.textContent = answer.text;
            questionOption.answerOfQuestion = answer.correct;

            questionOptions.insertAdjacentElement('beforeend',questionOption);
        }        

        let questionOption = document.querySelectorAll('.question__option');

        questionOption.forEach(item => item.addEventListener('click', (event)=>{

            let eventTarget : any = event.target;

            if(eventTarget.answerOfQuestion) {
                eventTarget.classList.add('question_true')
                ++this._points;
            } else {
                eventTarget.classList.add('question_false')
                questionOption.forEach((item : any) => item.answerOfQuestion ? item.classList.add('question_true') : 1 )
            }
            ++this._questionNumber;
        }))

    }
    deleteQuestion() {
        let question = document.querySelector('.question');
        if (question) {
            question.remove()
        } else {
            console.log(2);
        }
    }
    getResult(){
        console.log('result')
        this._result = document.createElement('div');
        this._result.innerHTML = `<h1 class='result__item'>Количество набранных очков <span class='result__value'>${this._points}</span> </h1> 
                            <h1 class='result__item'>Количество правильных ответов <span class='result__value'>${this._points}</span> из ${this._NumberOfQuestions}</h1>`;
        this._result.classList.add('game__result'); 
        this._result.classList.add('result'); 
        this.gameField.append(this._result);
    }
    deleteResult() {
        let result = document.querySelector('.result')
        if (result) {
            result.remove();
            console.log('delete result');
        }
    }
    playAgain() {
        console.log('playagain');
        this._points = 0;
        this._questionNumber = 0;
        this.deleteResult();
        this.again.classList.remove('again');
        this.next.classList.add('next')

        this.nextQuestion();
    }
    endGame() {
        this.deleteResult();
        this.deleteQuestion();
        this.again.classList.remove('again');
        this.next.classList.remove('next')
    }

}
import { PackageOfQuestions, Question, Answer, SetItemHTMLDivElement, SetItemEventTarget} from "../models/types";

import { getSetSize, getQuestionTitle, getAnswersTitle, getCorrect  } from "../service/game.service";
export class Game {

    private _points : number;

    private _questions : Question[];
    private _questionNumber : number;
    private _NumberOfQuestions : number;
    private _result : Element;

    next = document.querySelector('.game__next');
    again = document.querySelector('.game__again');
    gameField = document.querySelector('.game__field');

    constructor(private setID : number) {

        this.next.addEventListener('click',()=> this.nextQuestion());
        this.again.addEventListener('click',()=> this.playAgain());
        this.init();
        
    }

    async init(){
        this._points = 0;
        this._questionNumber = 0;
        this._NumberOfQuestions = await getSetSize(this.setID);
        this.runGame()
    }



    async runGame(){
        this.createQuestion();
        this.next?.classList.add('next')
    }

    async nextQuestion() {
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
    
    async createQuestion() {
        this.deleteQuestion();

        let questionTitle : string = await getQuestionTitle(this.setID, this._questionNumber+1);

        let answersTitle : Answer[] = await getAnswersTitle(this.setID,this._questionNumber+1) ;
        

        let quest = document.createElement('div');
        quest.classList.add('game__question');
        quest.classList.add('question');
        this.gameField.prepend(quest);

        quest.insertAdjacentHTML('afterbegin', `
        <h1 class="question__title">${questionTitle}</h1>
        <div class="question__options"></div>
        `);

        let questionOptions = document.querySelector('.question__options');
        for(let answer of answersTitle) {
            let questionOption: SetItemHTMLDivElement = document.createElement('div');
            questionOption.classList.add('question__option');
            questionOption.textContent = answer.text;
            questionOption.answerID = answer.id;

            questionOptions.insertAdjacentElement('beforeend',questionOption);
        }        

        let questionOption = document.querySelectorAll('.question__option');

        questionOption.forEach(item => item.addEventListener('click', async (event)=>{

            let eventTarget : any = event.target;

            let correctID = await getCorrect(this.setID,this._questionNumber+1, eventTarget.answerID)
            console.log("! " +correctID);
            if(eventTarget.answerID == correctID) {
                console.log("@!!!");
                
                eventTarget.classList.add('question_true')
                ++this._points;
            } else {
                eventTarget.classList.add('question_false')
                questionOption.forEach((item : any) => item.answerID==correctID ? item.classList.add('question_true') : 1 )
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
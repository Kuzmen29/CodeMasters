import { PackageOfQuestions, SetItemHTMLDivElement } from "./types";
import { Game } from "./game";


export function start(data: PackageOfQuestions[]){
    let gameSets = document.querySelector('.menu__sets');

    for(let item of data) {

        let setsItem : SetItemHTMLDivElement = document.createElement('div');
        setsItem.setItem = item;
        setsItem.textContent = item.set;
        setsItem.classList.add('sets__item');
        gameSets.append(setsItem);

        setsItem.addEventListener('click', (event)=> {
            event.preventDefault();

            let eventTarget : any = event.target;

            clear()
            let myGame : Game;
            myGame = new Game(eventTarget.setItem);
            
        })
    }
}

function clear() {
    let question = document.querySelector('.game__question');
    if (question) {
        question.remove();
    }
    let result = document.querySelector('.result');
    if (result) {
        result.remove();
    }
    let next = document.querySelector('.game__next');
    let again = document.querySelector('.game__again');
    again.classList.remove('again');
    next.classList.remove('next');
}
import { PackageOfQuestions, SetItemHTMLDivElement } from "./types";
import { Game } from "./game";
import { getSets } from "./../service/menu.service";


export async function start(){

    let data : PackageOfQuestions[] = await getSets()
    let gameSets = document.querySelector('.menu__sets');

    let myGame : Game;
    for(let item of data) {

        let setsItem : SetItemHTMLDivElement = document.createElement('div');
        setsItem.setID = item.id;
        setsItem.textContent = item.set;
        setsItem.classList.add('sets__item');
        gameSets.append(setsItem);

        setsItem.addEventListener('click', (event)=> {
            event.preventDefault();

            let eventTarget : any = event.target;

           // clear()
           if (myGame) {
            myGame.endGame()
           }
           
            myGame = new Game(eventTarget.setID);
            
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
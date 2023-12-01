import { start } from "./models/menu";

import { PackageOfQuestions } from "./models/types";

import '../styles/style.scss'

let data : PackageOfQuestions[];

fetch('http://localhost:3000/data').then((response)=>response.json()).then((response)=> {
    data = response;
    start(data);
});



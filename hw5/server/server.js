const express = require("express");
const app = express();

const jsonParser = express.json();

const data = require('../data/data.json')

const cors = require('cors')

app.use(cors())

app.get("/api/json", jsonParser, async (request, response) => {
    console.log("Вывод всех данных!");

    response.json(data)
});

app.get("/api/sets", jsonParser, function (request, response) {
    let sets = data.map(item => {
        return {
            id : item.id,
            set: item.set
        }
    })
    response.json(sets);
})

app.get("/api/setSize/:setId", jsonParser, function (request, response) {
    if (!request.params.setId) return response.sendStatus(400);

    const setId = +request.params.setId;

    let set = data.find(item => item.id == setId)

    let setSize = set.setSize;
    response.json(setSize);
})
app.get("/api/question/:setId/:questionId", jsonParser, function (request, response) {
    if (!request.params.questionId) return response.sendStatus(400);

    const setId = +request.params.setId;
    const questionId = +request.params.questionId;

    let set = data.find(set => set.id == setId)


    let questions = set.questions;

    let question = questions.find(question =>question.id == questionId)

    let text = question.text
    response.json(text);
})
app.get("/api/answers/:setId/:questionId", jsonParser, function (request, response) {
    if (!request.params.questionId) return response.sendStatus(400);

    const setId = +request.params.setId;
    const questionId = +request.params.questionId;

    let set = data.find(set => set.id = setId)

    let questions = set.questions;

    let question = questions.find(question => question.id == questionId)

    let answers = question.answers;
    answers = answers.map(answer => {
        return {
            id:answer.id,
            text: answer.text
        }
    })
    response.json(answers);
})

app.get("/api/correct/:setId/:questionId", jsonParser, function (request, response) {
    if (!request.params.questionId) return response.sendStatus(400);

    const setId = +request.params.setId;
    const questionId = +request.params.questionId;

    let set = data.find(set => set.id == setId)
    let questions = set.questions;
    let question = questions.find(question => question.id == questionId)

    let answers = question.answers;

    let correct = answers.find(answer => answer.correct == true)
    let correctId = correct.id;
    response.json(correctId);
})

app.listen(3000, () => console.log("Сервер ожидает подключения..."));

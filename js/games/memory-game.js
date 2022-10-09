let quetionslist = [];
let answerKey = {};
let points = 0;
let timer = 0;
let seconds = 0;
let minutes = 0;
let seconds_str = '';
let minutes_str = '';
let timer_observer;
let moves = 0;
let isCorrect = false;
let turn = 1;
let first = '';
let second = '';
let isFinished = false;
let num_correct_answerses = 0;
let firstbox;
let secondbox;
let path = '';
let unit = '';
let game = document.getElementById('game');
let movesCounter = document.getElementById('movesCounter');
let time = document.getElementById('timeCount');
let not_available = document.getElementById('not-avaliable');

let start_btn = document.getElementById('start-btn');

function getPath() {
    let grade = document.getElementById("grades");
    let grade_value = grade.value;
    let level = document.getElementById("levels");
    let level_value = level.value;
    let unit = document.getElementById("units");
    let unit_value = unit.value;
    unit = unit_value;
    path = "../../resources/JSON/" + grade_value + "-" + level_value + ".json";
    return {
        path,
        unit
    };
}

getPath();
start_btn.addEventListener('click', function () {
    not_available.classList.add('hide');
    let loader2 = document.getElementById('loader-2');
    loader2.classList.remove('hide');
    document.getElementById('game').classList.remove('hide');
    setTimeout(function () {
        loader2.classList.add('hide');
        start_btn.style.display = 'none';
        path = getPath().path;
        unit = getPath().unit;
        readTextFile(path, function (text) {
            var data = JSON.parse(text);
            try {
                quetionslist = data[unit];
                createGame(quetionslist);
                createAnswerKey(quetionslist);
                startWatching(seconds, minutes);
            } catch (error) {
                console.log(error);
                not_available.classList.remove('hide');
                start_btn.style.display = 'block';
            }
        });
    }, 1000);

});

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        } else if (rawFile.status == "404") {
            not_available.classList.remove('hide');
            start_btn.style.display = 'block';
        }
    }
    rawFile.send(null);
}

function createGame(quetions) {
    let allBoxes = [];

    for (let i = 0; i < quetions.length; i++) {
        allBoxes.push(createBox(quetions[i]["question"]));
        allBoxes.push(createBox(quetions[i]["answer"]));
    }
    shuffle(allBoxes);
    for (let i = 0; i < allBoxes.length; i++) {
        game.appendChild(allBoxes[i]);
    }
    boxClick();
}

function createBox(text) {
    let box = document.createElement('div');
    let flip_box = document.createElement('div');
    box.classList.add('box');
    flip_box.classList.add('flip-card-back');
    let box_text = document.createElement('h1');
    box_text.setAttribute('id', 'box-text');
    box_text.innerHTML = text;
    flip_box.appendChild(box_text);
    box.appendChild(flip_box);
    return box;
}

function boxClick() {
    let box = document.querySelectorAll('.box');
    box.forEach(function (b) {
        b.addEventListener('click', function () {
            b.classList.add('flip');
            if (turn == 1) {
                firstbox = b;
                first = firstbox.textContent;
                turn = 2;
            } else if (turn == 2) {
                secondbox = b;
                second = secondbox.textContent;
                if (firstbox == secondbox) return;
                if (checkAnswer(first, second)) {
                    num_correct_answerses++;
                    points = +10;
                } else {
                    setTimeout(function () {
                        firstbox.classList.remove('flip');
                        secondbox.classList.remove('flip');
                    }, 1000);
                }
                turn = 1;
                first = '';
                second = '';
            }
            moves = moves + 1;
            movesCounter.innerHTML = moves;
        });
    });
}

function checkAnswer(first, second) {
    if (second == answerKey[first]) {
        return true;
    }
    return false;
}

function createAnswerKey(answerkeys) {
    for (let i = 0; i < answerkeys.length; i++) {
        answerKey[answerkeys[i]["question"]] = answerkeys[i]["answer"];
        answerKey[answerkeys[i]["answer"]] = answerkeys[i]["question"];
    }
}

function shuffle(array) {
    let currentIndex = array.length,
        randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }
    return array;
}

function startWatching(seconds, minutes) {
    timer_observer = setInterval(() => {
        seconds > 58 ? ((minutes += 1), (seconds = 0)) : (seconds += 1);
        seconds_str = seconds > 9 ? `${seconds}` : `0${seconds}`;
        minutes_str = minutes > 9 ? `${minutes}` : `0${minutes}`;
        time.innerHTML = `${minutes_str}:${seconds_str}`;
        if (num_correct_answerses == 10) {
            clearInterval(timer_observer);
        }
    }, 1000);
}
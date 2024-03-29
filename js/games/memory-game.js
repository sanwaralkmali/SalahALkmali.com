let quetionslist = [];
let randomQuestions = [];
let points = 0;
let timer = 0;
let seconds = 0;
let minutes = 0;
let q_num = 0;
let seconds_str = '';
let minutes_str = '';
let timer_observer;
let moves = 0;
let path = '';
const memoryBoard = document.getElementById('memory-board');
let movesCounter = document.getElementById('movesCounter');
let time = document.getElementById('timeCount');
let not_available = document.getElementById('not-avaliable');
let movesContainer = document.getElementById('moves');
let pointsContainer = document.getElementById('points');
let pointCounter = document.getElementById('pointsCount');
let timerContainer = document.getElementById('timer');
let memoryGame_header = document.getElementById('memoryGameHeader')
let start_btn = document.getElementById('start-btn');
let level_value = '';
let topic_value = '';
let grade_value = '';

class Question {
    constructor(question, answer, qType = "text", aType = "text") {
        this.question = question;
        this.answer = answer;
        this.qType = qType;
        this.aType = aType;
    }
}


function getPath() {
    let grade = document.getElementById("grades");
    grade_value = grade.value;
    let level = document.getElementById("levels");
    level_value = level.value;
    let topics = document.getElementById("topics");
    topic_value = topics.value;
    path = "../../resources/JSON/1/Addition.json";
    console.log(path);
    return {
        grade_value,
        level_value,
        path,
        topic_value
    };
}

async function handleSubmit(event) {
    event.preventDefault();
    document.getElementById("memory-board").classList.remove("hidden");
    not_available.classList.add('hide');
    let loader2 = document.getElementById('loader-2');
    loader2.classList.remove('hide');
    setTimeout(async function () {
        loader2.classList.add('hide');
        start_btn.style.display = 'none';
        path = getPath().path;
        const topic = getPath().topic_value;
        const level = getPath().level_value;

        if (level == "Easy") q_num = 4;
        else if (level == "Medium") q_num = 6;
        else if (level == "Hard") q_num = 9;
        else if (level == "Super Hard") q_num = 6;
        try {
            questionList = await fetchQuestions(path, level);
            randomQuestions = getRandomQuestions(questionList, q_num);
            createMemoryBoard(memoryBoard, randomQuestions, questionList);
            startWatching(seconds, minutes, randomQuestions);
            movesContainer.classList.remove('hide');
            pointsContainer.classList.remove('hide');
            timerContainer.classList.remove('hide');
            memoryGame_header.classList.toggle('hide');
        } catch (error) {
            console.log(error);
            not_available.classList.remove('hide');
            start_btn.style.display = 'block';
        }
    }, 1000);
}

async function fetchQuestions(path) {
    try {
        const response = await fetch(path);
        const data = await response.json();
        const questionList = data.map(item => new Question(item.question, item.answer, item.qType, item.aType));
        return questionList;
    } catch (error) {
        console.error('Error fetching questions:', error);
        return;
    }
}

function getRandomQuestions(questions, count) {
    const shuffledQuestions = [...questions];
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]];
    }
    return shuffledQuestions.slice(0, count);
}

function createMemoryBoard(memoryBoard, questionPairs) {
    const cardItems = questionPairs.flatMap(pair => [{
            text: pair.question,
            type: pair.qType
        },
        {
            text: pair.answer,
            type: pair.aType
        }
    ]);
    shuffleArray(cardItems);
    cardItems.forEach((item, index) => {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.dataset.text = item.text;

        let cardContent;
        if (item.type === "image") {
            const img_path = "../../resources/JSON/" + grade_value + "/" + "images" + "/" + topic_value + "/" + item.text;
            cardContent = `<img src="${img_path}" alt="Image" class="card-img"/>`;
        } else {
            cardContent = item.text;
        }

        card.innerHTML = `
            <div class="memory-card-inner">
                <div class="memory-card-front"></div>
                <div class="memory-card-back">${cardContent}</div>
            </div>
        `;
        const cardListener = (event) => flipCard(event, questionPairs);
        card.addEventListener('click', cardListener);
        card.listener = cardListener;
        memoryBoard.appendChild(card);
    });
}


function checkCards(questionPairs) {
    const flippedCards = document.querySelectorAll('.memory-card.flipped');
    let isSuper = false;
    isMatch = false;
    moves = moves + 1;
    movesCounter.innerHTML = moves;
    if (flippedCards.length === 2) {
        const card1Text = flippedCards[0].dataset.text;
        const card2Text = flippedCards[1].dataset.text;
        for (const item of questionPairs) {
            if ((item.question === card1Text && item.answer === card2Text) || (item.question === card2Text && item.answer === card1Text)) {
                isMatch = true;
                flippedCards.forEach(card => {
                    card.classList.add('matched');
                    card.removeEventListener('click', card.listener);
                    points += 10;
                    pointCounter.innerHTML = points.toString();
                });

            } else {
                setTimeout(() => {
                    isMatch = false;
                    flippedCards.forEach(card => {
                        card.classList.remove('flipped');
                    });
                }, 1000);
            }
            if (level_value === "Super Hard") {
                isSuper = true;

            }

        }
        if (!isMatch && isSuper) {
            setTimeout(() => {
                resetMatchedCards();
            }, 1000);
        }

    }


}

function resetMatchedCards() {
    const matchedCards = document.querySelectorAll('.memory-card.matched');
    matchedCards.forEach(card => {
        card.classList.remove('matched');
        card.classList.remove('flipped');
        card.addEventListener('click', card.listener);
    });
    points = 0;
    pointCounter.innerHTML = points.toString();
}


function flipCard(event, questionPairs) {
    const flippedCards = document.querySelectorAll('.memory-card.flipped');
    if (flippedCards.length >= 2) {
        return;
    }

    const card = event.currentTarget;
    card.classList.add('flipped');
    checkCards(questionPairs);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startWatching(seconds, minutes, questionPairs) {
    timer_observer = setInterval(() => {
        seconds > 58 ? ((minutes += 1), (seconds = 0)) : (seconds += 1);
        seconds_str = seconds > 9 ? `${seconds}` : `0${seconds}`;
        minutes_str = minutes > 9 ? `${minutes}` : `0${minutes}`;
        time.innerHTML = `${minutes_str}:${seconds_str}`;

        if (document.querySelectorAll('.memory-card.matched').length === questionPairs.length * 2) {
            setTimeout(() => {
                clearInterval(timer_observer);
                let score = points * 10 - moves*10;
                let timeInSeconds = minutes * 60 + seconds;
                score = score - timeInSeconds * 10;
                pointCounter.innerHTML = score.toString();
                document.getElementById('play-again').innerHTML = 'Play Again';
                document.getElementById('play-again').classList.add('play-again-btn');
                document.getElementById('play-again').addEventListener('click', function () {
                    playAgain(questionPairs);
                });
            }, 100);
        }
    }, 1000);
}

function playAgain(length) {
    document.querySelectorAll('.memory-card-inner').forEach(e => e.classList.remove('matched'));
    randomQuestions = getRandomQuestions(questionList, q_num);
    memoryBoard.innerHTML = '';
    createMemoryBoard(memoryBoard, randomQuestions, questionList);
    points = 0;
    timer = 0;
    seconds = 0;
    minutes = 0;
    moves = 0;
    startWatching(seconds, minutes, length);
    pointCounter.innerHTML = points.toString();
    movesCounter.innerHTML = moves;
    document.getElementById('play-again').innerHTML = '';
    document.getElementById('play-again').classList.remove('play-again-btn');
}
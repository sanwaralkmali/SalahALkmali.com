let game_container = document.getElementById("game-container");

document.getElementById('millionaire-game-btn').addEventListener('click', function () {
    document.getElementById('text001').style.display = 'block';
});

document.getElementById('quizizz-game-btn').addEventListener('click', function () {
    document.getElementById('text002').style.display = 'block';
});

document.getElementById('close-memory-game').addEventListener('click', function () {
    location.reload();
});

let memory_game_btn = document.getElementById('memory-game-btn');
memory_game_btn.addEventListener('click', function () {
    game_container.classList.toggle('hide');
    document.getElementById('games-card').classList.toggle('hide');
    document.getElementById('loader').classList.toggle('hide');
    setTimeout(function () {
        document.getElementById('loader').classList.toggle('hide');
        document.getElementById('memory-game').classList.toggle('hide');
    }, 1500);
});
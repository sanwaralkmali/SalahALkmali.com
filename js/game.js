let millionaire_game_btn = document.getElementById('millionaire-game-btn');
millionaire_game_btn.addEventListener('click', function () {
    document.getElementById('games-card').classList.toggle('hide');
    document.getElementById('loader').classList.toggle('hide');
    setTimeout(function () {
        console.log('Loading millionaire game...');
        document.getElementById('loader').classList.toggle('hide');
        document.getElementById('millionaire-game').classList.toggle('hide');
    }, 100);
});

let memory_game_btn = document.getElementById('memory-game-btn');
memory_game_btn.addEventListener('click', function () {
    document.getElementById('games-card').classList.toggle('hide');
    document.getElementById('loader').classList.toggle('hide');
    setTimeout(function () {
        console.log('Loading millionaire game...');
        document.getElementById('loader').classList.toggle('hide');
        document.getElementById('memory-game').classList.toggle('hide');
    }, 500);
});
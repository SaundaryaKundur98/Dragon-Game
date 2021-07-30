score = 0;
cross = true;

audio = new Audio('music.mp3');
audiogo = new Audio('gameover.mp3');
setTimeout(() => {
    audio.play()
}, 1000);
document.onkeydown = function (e) {
    console.log("Key code is: ",e.keyCode)
    if(e.keyCode == 38){
        deer = document.querySelector('.deer');
        deer.classList.add('animationDeer');
        setTimeout(() => {
            deer.classList.remove('animationDeer');
        }, 700);
    }
    if(e.keyCode == 39){
        deer = document.querySelector('.deer');
        deerX = parseInt(window.getComputedStyle(deer, null).getPropertyValue('left'));
        deer.style.left = deerX + 112 + "px";
    }
    if(e.keyCode == 37){
        deer = document.querySelector('.deer');
        deerX = parseInt(window.getComputedStyle(deer, null).getPropertyValue('left'));
        deer.style.left = (deerX - 112) + "px";
    }
}

setInterval(() => {
    deer = document.querySelector('.deer');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(deer, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(deer, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);

    if(offsetX < 93 && offsetY < 92){
        score += 0;
        updateScore(score);
        cross = false;
        gameOver.innerHTML = "Game Over - Reload To Play Again";
        obstacle.classList.remove('obstacleAni')
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
    }
    else if(offsetX < 145 && cross){
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation.duration'))
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
            console.log('New animation duration: ',newDur)
        }, 500);
        
    
    }
}, 100);

function updateScore(score){
    scoreCount.innerHTML = "Your Score: "+score
}
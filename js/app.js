/**
* Variables
*/

var lives = 5; // maximum lives for the game
var score = 0; // score for collecting gems

// popup windows
const startGamePopup = document.getElementById('gameStartPopup');
const endGamePopup = document.getElementById('gameEndPopup');
const winGamePopup = document.getElementById('gameWinPopup');

/**
* Constructor functions
*/

// Enemy constructor function
var Enemy = function(x, y) {
    // x and y coordinates for the enemy objects on the canvas
    this.x = x;
    this.y = y;
    // randomised speed for each of the enemy objects
    this.speed = Math.floor((Math.random() * 1000) + 1);
    // the image/sprite for enemies (uses a helper to easily load images)
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position
Enemy.prototype.update = function(dt) {
    // multiply any movement by the dt parameter (a time delta between ticks)
    // (ensures the game runs at the same speed for all computers)
    this.x += this.speed * dt;
    // keep enemies moving across the canvas repeatedly
    if (this.x > 505) {
        this.x = -100;
    }
};

// Draw the enemy on the screen (required method for game)
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player constructor function
var Player = function(x, y) {
    // x and y coordinates for the player object on the canvas
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png'; // default image for player
    // update function (required)
    this.update = function() {};
    // render the player on canvas
    this.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
    // move the player with arrow keys
    // but only within the canvas
    this.handleInput = function(keyCode) {
        if (keyCode === 'left' && this.x > 100) {
            this.x -= 101;
        } else if (keyCode === 'up' && this.y > 0) {
            this.y -= 83;
        } else if (keyCode === 'right' && this.x < 404) {
            this.x += 101;
        } else if (keyCode === 'down' && this.y < 392) {
            this.y += 83;
        }
    }
};

// Gem constructor function
var Gem = function() {
    // select a random column
    this.x = Math.floor((Math.random() * 5) + 0) * 101;

    // select a random row below the water blocks
    this.y = Math.floor((Math.random() * 5) + 0) * 83 + 52;

    // move gems to the left if they are randomly placed over the player's starting position
    if (this.x === 202 && this.y === 384) {
        this.x = 101;
    };

    this.sprite = 'images/gem-green.png'; // default image for gems

    // render the gems on the canvas
    this.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
};

/**
* Objects and properties
*/

// Enemies
var enemy1 = new Enemy(-100, 60);
var enemy2 = new Enemy(-100, 143);
var enemy3 = new Enemy(-100, 226);

// Player
var player = new Player(202, 392);

// Gems
var greenGem = new Gem();
var blueGem = new Gem();
var orangeGem = new Gem();

// Gem colors
blueGem.sprite = 'images/gem-blue.png';
orangeGem.sprite = 'images/gem-orange.png';

/**
* Arrays
*/

// Enemies array
var allEnemies = [enemy1, enemy2, enemy3];

// Gems array
var allGems = [greenGem, blueGem, orangeGem];

/**
* Functions
*/

// Check if the player and an enemy collide
// Check if player has collected a gem
function checkCollisions() {
    // loop the enemies array
    for (var i = 0; i < allEnemies.length; i++) {
        var enemy = allEnemies[i];

        // check if the player and an enemy collide
        if (enemy.y === player.y && enemy.x > (player.x - 50) && enemy.x < (player.x + 50)) {

            // reduce lives
            lives--;

            // end game if there are no more lives left
            if (lives <= 0) {
                lives = 0;
                endGame();
            } else {
                // reset the game by placing the player back into the starting position
                startOver();
            }
        } else if (player.y < 0) {
            // end game if the player reaches the top without colliding with enemies
            setTimeout(function() {
                // set a short delay so that player can reach the top tile
                winGame();
            }, 200);
        }
    }

    // loop the gems array
    for (var i = 0; i < allGems.length; i++) {
        var gem = allGems[i];
        // check if the player picks up a gem
        if (gem.x === player.x && gem.y > (player.y - 50) && gem.y < (player.y + 50)) {

            // Add score based on gem type
            if (gem.sprite === 'images/gem-green.png') {
                score += 500;
            } else if (gem.sprite === 'images/gem-blue.png') {
                score += 250;
            } else if (gem.sprite === 'images/gem-orange.png') {
                score += 100;
            }

            // Show the new score and remove the gem form the canvas
            gem.x = undefined;
        };
    }
}

// show the score
function renderScore() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Score: " + score, 8, 20);
}

// show lives
function renderLives() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Lives: " + lives, 108, 20);
}

// reset the game board when player collides with an enemy
function startOver() {

    //reset position for player
    player.x = 202;
    player.y = 392;

    //reset position for enemies
    enemy1.x = -100;
    enemy1.y = 60;
    enemy2.x = -100;
    enemy2.y = 143;
    enemy3.x = -100;
    enemy3.y = 226;
}

// How to play popup (show at the start)
function startGame() {
    setTimeout(function() {
        startGamePopup.style.display = 'none';
    }, 3500);
}

// End the game popup (when player looses)
function endGame() {
    stopGame();
    // Show 'No lives' popup
    endGamePopup.style.display = 'initial';
}

// End the game popup (when player wins)
function winGame() {
    stopGame();
    // Show 'You won' popup
    winGamePopup.style.display = 'initial';
}

// When game ends, stop enemies and player from moving
function stopGame() {
    // stop enemies from moving
    enemy1.speed = null;
    enemy2.speed = null;
    enemy3.speed = null;
    player.handleInput = function() {
    }
}

/**
* Event listeners
*/

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Show instructions for the game when the page loads
window.addEventListener("load", function(e) {
    startGame();
});
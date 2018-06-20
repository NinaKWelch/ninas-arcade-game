// variables
var lives = 5;


// Enemy constructor function
var Enemy = function(x, y) {
    // x and y coordinates for the enemy objects on the canvas
    this.x = x;
    this.y = y;
    // randomised speed for each of the enemy objects
    this.speed = Math.floor((Math.random() * 1000) + 1);
    // The image/sprite for enemies (uses a helper to easily load images)
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position
Enemy.prototype.update = function(dt) {
    // multiply any movement by the dt parameter (a time delta between ticks)
    // (ensures the game runs at the same speed for all computers)
    this.x += this.speed * dt;
    // keep enemy moving across the canvas
    if(this.x > 505) {
        this.x = -100;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player constructor function (requires an update(), render() and a handleInput() method.)
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png'; // The image/sprite for player
    this.update = function() {
      // code
    };
    this.render = function() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
    this.handleInput = function(keyCode) {
        if(keyCode === 'left' && player.x > 100) {
            player.x -=101;
        } else if(keyCode === 'up' && player.y > 0) {
            player.y -=83;
        } else if(keyCode === 'right' && player.x < 404) {
            player.x +=101;
        } else if(keyCode === 'down' && player.y < 392) {
            player.y += 83;
        }
    }
};


// Instantiate the objects
var enemy1 = new Enemy(-100, 60);
var enemy2 = new Enemy(-100, 143);
var enemy3 = new Enemy(-100, 226);


// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1, enemy2, enemy3];

// Place the player object in a variable called player
var player = new Player(202, 392);

// Check if the player and an enemy collide before player reaches the top
function checkCollisions() {
    // loop enemies array
    for(var i = 0; i < allEnemies.length; i++) {
        var enemy = allEnemies[i];

        // check if the player and an enemy collide
        if(enemy.y === player.y && enemy.x > (player.x - 50) && enemy.x < (player.x + 50)) {

            // reduce lives
            lives--;

            // end game if there are no more lives left
            if(!lives) {
                alert('Game over!');
            } else {
                // reset the game
                startOver();
            }
        } else if(player.y < 0) {
            // end game if the player reaches the top without colliding
            setTimeout(function() {
                alert('You won!');
            }, 200);
        }
    }
}

// reset the game board
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

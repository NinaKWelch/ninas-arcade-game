// Enemy class
var Enemy = function(x, y) {
    // x and y coordinates for the enemy objects on the canvas
    this.x = x;
    this.y = y;
    // randomised speed for each of the enemy objects
    // The image/sprite for enemies (uses a helper to easily load images)
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class (requires an update(), render() and a handleInput() method.)
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png'; // The image/sprite for player
    this.update = function() {
      // code
    }
    this.render = function() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};


// Instantiate the objects
var enemy1 = new Enemy(0, 60);
var enemy2 = new Enemy(0, 143);
var enemy3 = new Enemy(0, 226);

// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1, enemy2, enemy3];

// Place the player object in a variable called player
var player = new Player(200, 400);


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

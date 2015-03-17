var SHOW_COLLISION_BOUNDS = 0;
var DEBUG = false;
var ENEMY_COLLISION_ON = 0;
var WATER_COLLISION_ON = 0;
var NUM_ENEMIES = 4;
var CELL_Y = 83;
var CELL_X = 101;

var randomRange = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Enemies our player must avoid
var Enemy = function(speed) {
  var lane = randomRange(0, 2);
  var speed = lanes[lane].speed;
  var villan = villans['bug'];
  this.sprite = villan.sprite;
  this.cCircle = villan.cCircle;
  this.cBox = villan.cBox;
  lanes[lane].count++;
  this.xStarting = lanes[lane].count * (-3 * CELL_X);
  this.x = this.xStarting;
  this.y = lanes[lane].yPos;

  this.speed = lanes[lane].speed;
  if (DEBUG) {
    this.x = 200;
    this.y = 200;
  }
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  if (!DEBUG) {
    this.x += this.speed * dt;
  }
  if (this.x > settings.gameWidth) {
    // move enemey to starting position
    this.x = -101;
  }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  if (SHOW_COLLISION_BOUNDS) {
    // circle collision bounds
    ctx.beginPath();
    ctx.arc(this.x + this.cCircle.xOff,
      this.y + this.cCircle.yOff,
      42,
      0,
      2 * Math.PI,
      false);
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#f00';
    ctx.stroke();
    // box collision bounds
    ctx.beginPath();
    ctx.rect(this.x + this.cBox.xOff,
      this.y + this.cBox.yOff,
      this.cBox.w,
      this.cBox.h);
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#00f';
    ctx.stroke();
  }

}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  var hero = heros['boy'];
  var leftMax = 0 - hero.cBox.xOff;
  var rightMax = settings.gameWidth - (hero.cBox.w + hero.cBox.xOff);
  var waterMin = 130 - hero.cBox.yOff;
  this.hero = hero;
  this.cBox = hero.cBox;
  this.sprite = hero.sprite;
  this.speed = hero.speed;
  //this.col = 2;
  //this.row = 4;
  this.startPos = {x:202, y:372};
  this.x = this.startPos.x;
  this.y = this.startPos.y;

  this.upMax = -61;
  this.downMax = 403;
  this.leftMax = leftMax;

  this.waterMin = waterMin;
  this.rightMax = rightMax;
}

Player.prototype.update = function(dt) {
  this.handleInput(dt);
  this.checkCollision();
}

Player.prototype.reset = function() {
  this.x = this.startPos.x;
  this.y = this.startPos.y;
}

Player.prototype.checkCollision = function() {

  if (this.y < settings.dangerZone) {
    // in danger area
    for (i = 0, len = allEnemies.length; i < len; i++) {
      var enemy = allEnemies[i];

      //console.log("danger zone");
      var enemyCircle = {
        radius: 49,
        x: enemy.x + enemy.cCircle.xOff,
        y: enemy.y + enemy.cCircle.yOff
      }
      var playerCircle = {
        radius: this.hero.cCircle.radius,
        x: this.x + this.hero.cCircle.xOff,
        y: this.y + this.hero.cCircle.yOff
      }
      //if(this.circleCollision(playerCircle, enemyCircle)) {
      //  this.reset();
      //}
      var playerBox = {
        x: this.x + this.cBox.xOff,
        y: this.y + this.cBox.yOff,
        width: this.cBox.w,
        height: this.cBox.h
      }
      var enemyBox = {
        x: enemy.x + enemy.cBox.xOff,
        y: enemy.y + enemy.cBox.yOff,
        width: enemy.cBox.w,
        height: enemy.cBox.h
      }
      if (this.boxCollision(playerBox, enemyBox)) {
        console.log('box collision');
        if (ENEMY_COLLISION_ON) {
          this.reset();
        }
      }
    }
  }
  // reset if you hit water
  if (this.y < 10) {
    console.log('hit water');
    if (WATER_COLLISION_ON) {
      this.reset();
    }
  }

}
Player.prototype.circleCollision = function(c1, c2) {
  var c1;
  var c2;
  var dx;
  var dy;
  var distance;

  dx = (c1.x + c1.radius) - (c2.x + c2.radius);
  dy = (c1.y + c1.radius) - (c1.y + c2.radius);
  distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < c1.radius + c2.radius) {
    console.log('collision');
    return true;
  }
  return false;
}
Player.prototype.boxCollision = function(b1, b2) {
  if (b1.x < b2.x + b2.width &&
    b1.x + b1.width > b2.x &&
    b1.y < b2.y + b2.height &&
    b1.height + b1.y > b2.y) {
    // collision detected!
    return true;
  }
  return false;
}

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  if (SHOW_COLLISION_BOUNDS) {
    // circle collision bounds
    ctx.beginPath();
    ctx.arc(this.x + this.hero.cCircle.xOff,
      this.y + this.hero.cCircle.yOff,
      this.hero.cCircle.radius,
      0,
      2 * Math.PI,
      false);
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#f00';
    ctx.stroke();
    // box collision bounds
    ctx.beginPath();
    ctx.rect(this.x + this.cBox.xOff,
      this.y + this.cBox.yOff,
      this.cBox.w,
      this.cBox.h);
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#00f';
    ctx.stroke();

  }
  //console.log(this.y);
}

Player.prototype.handleInput = function(dt) {
  if ('up' in keysDown && this.y > this.upMax) { // Player holding up
    this.y -= this.speed * dt;
  }
  if ('down' in keysDown && this.y < this.downMax) { // Player holding down
    this.y += this.speed * dt;
  }
  if ('left' in keysDown && this.x > this.leftMax) { // Player holding left
    this.x -= this.speed * dt;
  }
  if ('right' in keysDown && this.x < this.rightMax) { // Player holding right
    this.x += this.speed * dt;
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

for ($i = 0; $i < NUM_ENEMIES; $i++) {
  allEnemies.push(new Enemy());
}
var player;
player = new Player();

// Object to store key state
var keysDown = {};
var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
};
// This listens for valid key presses and toggles the state of the keypress
document.addEventListener('keydown', function(e) {
  //player.handleInput(allowedKeys[e.keyCode]);
  // key is down, store state
  keysDown[allowedKeys[e.keyCode]] = true;
});
document.addEventListener('keyup', function(e) {
  //player.handleInput(allowedKeys[e.keyCode]);
  // key is up, delete state
  delete keysDown[allowedKeys[e.keyCode]];
});

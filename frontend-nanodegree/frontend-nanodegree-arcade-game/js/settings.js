'use strict';
/**
 * General game settings
 *
 * @type {Object}
 */
var settings = {
  gameWidth: 505,
  gameHeight: 606,
  dangerZone: 265
};
/**
 * Hero types that the player can use
 *
 * @type {Object}
 */
var heros = {
  boy: {
    sprite: 'images/char-boy.png',
    speed: 140,
    cCircle: {
      radius: 17,
      xOff: 51,
      yOff: 112
    },
    cBox: {
      xOff: 34,
      yOff: 117,
      w: 34,
      h: 21
    }
  }
};
/**
 * Enemy types
 * @type {Object}
 */
var villans = {
  bug: {
    sprite: 'images/enemy-bug.png',
    cCircle: {
      radius: 42,
      xOff: 50,
      yOff: 110
    },
    cBox: {
      xOff: 4,
      yOff: 80,
      w: 90,
      h: 60
    }
  }
};
/**
 * The lanes that the enemies travel in and attributes about the enemies in
 * those lanes
 *
 * @type {Array}
 */
var lanes = [
  {
    'speed': 200,
    'yPos': 55,
    'count': 0
  },
  {
    'speed': 150,
    'yPos': 138,
    'count': 0
  },
  {
    'speed': 100,
    'yPos': 220,
    'count': 0
  }
];

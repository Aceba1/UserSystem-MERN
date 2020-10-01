import React, { useEffect, useState } from 'react'
import Styles from '../utils/styles';

/**
 * @type {{
 *  body: 
 *    {x: number, y: number}[],
 *  direction: number,
 *  nextDirection: number,
 *  apple: {x: number, y: number},
 *  dead: boolean
 *  } snake
 */
class Snake {
  constructor() {
    this.init();
    window.addEventListener('keydown', (event) => {this.onKeydown(event)}, false); // Handle input

    setInterval(() => {this.onInterval()}, 75); // Game update interval
  }

  init() { // Initialize here, convenient for reset
    this.body = [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}]; // The snake
    this.direction = 1;
    this.nextDirection = -1;
    this.apple = {x: Snake.rndInt(55) + 5, y: Snake.rndInt(25) + 5}; // Randomize apple, but give some spave
    this.dead = false;
  }

  static rndInt(maxExc) {
    return Math.floor(Math.random() * maxExc);
  }

  checkApple(head) {
    if (this.apple.x === head.x && this.apple.y === head.y) {
      for (let i = 0; i < this.body.length; i++) {
        const pos = this.body[i];
        do {
          this.apple.x = Snake.rndInt(60); // Canvas width / 5
          this.apple.y = Snake.rndInt(30); // Canvas height / 5
        }
        while (this.apple.x === pos.x && this.apple.y === pos.y)
      }
      return true;
    }
    return false;
  }

  onInterval() {
    if (this.dead === true) {
      if (this.direction !== -1)
        this.init();
      else
        return;
    }
    var c = document.getElementById("game");
    /**
     * @type {CanvasRenderingContext2D}
     */
    const ctx = c.getContext('2d');

    const head = {...this.body[0]};
    switch (this.direction) {
      case 0: head.y--; break;
      case 2: head.y++; break;
      case 1: head.x++; break;
      case 3: head.x--; break;
      default: break;
    }
    if (head.x >= 60)
      head.x = 0;
    else if (head.x < 0)
      head.x = 59;
    if (head.y >= 30)
      head.y = 0;
    else if (head.y < 0)
      head.y = 29;

    if (!this.checkApple(head))
      this.body.pop();
    this.body.unshift(head);

    if (this.nextDirection !== -1) {
      this.direction = this.nextDirection;
      this.nextDirection = -1;
    }
    const light = Styles.currentStyle === 'light';

    ctx.fillStyle = light ? 'white' : 'black';
    ctx.fillRect(0, 0, 300, 150);

    ctx.fillStyle = 'orange'
    ctx.fillRect(this.apple.x * 5, this.apple.y * 5, 5, 5);

    ctx.fillStyle = light ? 'black' : 'white';
    ctx.fillRect(head.x * 5, head.y * 5, 5, 5);

    for (let i = 1; i < this.body.length; i++) {
      const pos = this.body[i];
      ctx.fillRect(pos.x * 5, pos.y * 5, 5, 5);

      if (head.x === pos.x && head.y === pos.y) {
        ctx.fillStyle = light ? '#666' : '#bbb';
        this.onDie(ctx);
        ctx.fillStyle = light ? 'black' : 'white';
      }
    }
  }

  onDie(ctx) {
    this.direction = -1;
    this.dead = true;
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${this.body.length}`, 110, 70, 140);
  }

  setDirection(dir) {
    if (this.nextDirection === -1)
      this.direction = dir;
    this.nextDirection = dir;
  }

  /**
   * @param {KeyboardEvent} event 
   */
  onKeydown(event) {
    switch(event.key) {
      case 'w': case 'W': case 'ArrowUp':
      this.setDirection(0); break;
      case 'd': case 'D': case 'ArrowRight':
      this.setDirection(1); break;
      case 's': case 'S': case 'ArrowDown':
      this.setDirection(2); break;
      case 'a': case 'A': case 'ArrowLeft':
      this.setDirection(3); break;
      default: break;
    }
  }
}

export default function Game() {
  const [running, setRunning] = useState(false);
  useEffect(() => {
    if (running) new Snake();
  }, [running])
  if (!running)
    setRunning(true);
  return (
    <canvas id='game' />
  )
}

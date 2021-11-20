var F12Clock=(function(exports){'use strict';/**
 * A zen-styled programmer's clock in the HTML comments.
 */
class F12Clock {
  static hourHandChar = '#'
  static minuteHandChar = '$'
  static secondHandChar = '"'

  /**
   * constructor
   */
  constructor () {
    this.canvasWidth = 60;
    this.canvasHeight = 30;
    this.centerX = this.canvasWidth / 2;
    this.centerY = this.canvasHeight / 2;
    this.armLength = Math.min(this.canvasWidth, this.canvasHeight) / 2;
    this.scaleX = (1.0 * this.canvasWidth) / 2.0 / this.armLength;
    this.scaleY = (1.0 * this.canvasHeight) / 2.0 / this.armLength;

    this.secondArmLength = this.armLength * 0.95;
    this.minuteArmLength = this.armLength * 0.95;
    this.hourArmLength = this.armLength * 0.65;

    this.options = {};
    this.options.showDigitalStrings = true;
    this.options.showClockFace = true;

    this.f12clockNode = document.getElementById('f12-clock');
    this.prevNodes = this.createCommentNodes();

    this.createView(false);
    this.start();
  }

  /**
   * draw a point with the param(c) to the given canvas
   * @param {char[][]} canvas char array
   * @param {number} x x
   * @param {number} y y
   * @param {char} c expect exactly 1 char
   */
  drawPoint (canvas, x, y, c) {
    if (x < 0 || x >= this.canvasWidth || y < 0 || y >= this.canvasHeight) {
      return
    }
    canvas[y][x] = c;
  }

  /**
   * draw a line to ghe given canvas by Bresenham's algorithm
   * @param {char[][]} canvas char array
   * @param {number} x1 x of start point
   * @param {number} y1 y of start point
   * @param {number} x2 x of end point
   * @param {number} y2 y of end point
   * @param {char} c char to draw line (expect exactly 1 char)
   */
  drawLine (canvas, x1, y1, x2, y2, c = '+') {
    x1 = parseInt(x1);
    y1 = parseInt(y1);
    x2 = parseInt(x2);
    y2 = parseInt(y2);
    const dx = Math.abs(x2 - x1);
    const dy = Math.abs(y2 - y1);
    const sx = x1 < x2 ? 1 : -1;
    const sy = y1 < y2 ? 1 : -1;
    let err = dx - dy;

    let loop = true;
    while (loop) {
      this.drawPoint(canvas, x1, y1, c);
      if (x1 === x2 && y1 === y2) {
        loop = false;
      } else {
        const doubledErr = err * 2;
        if (doubledErr > -dy) {
          err = err - dy;
          x1 = x1 + sx;
        }
        if (doubledErr < dx) {
          err = err + dx;
          y1 = y1 + sy;
        }
      }
    }
  }

  /**
   * create an canvas
   * @param {char} c a char to fill
   * @returns canvas(2 dimension char array)
   */
  createCanvas (c = '-') {
    const canvas = new Array(this.canvasHeight);
    for (let i = 0; i < this.canvasHeight; i++) {
      canvas[i] = new Array(this.canvasWidth).fill(c);
    }
    return canvas
  }

  /**
   * clear given canvas(char array)
   * @param {char[][]} canvas a canvas consists of char array
   * @param {char} c char to fill
   */
  clearCanvas (canvas, c = '-') {
    for (let i = 0; i < this.canvasHeight; i++) {
      for (let j = 0; j < this.canvasWidth; j++) {
        canvas[j][i] = c;
      }
    }
  }

  /**
   * convert degree to radian
   * @param {number} degree degree
   * @returns radian
   */
  toRad (degree) {
    // return (1.0 * degree * 2 * Math.PI) / 360
    return (degree / 180.0) * Math.PI
  }

  /**
   * update current time
   *
   * and hold values to this insatance
   */
  updateCurrentTime () {
    const now = new Date();
    this.hour = now.getHours();
    this.minute = now.getMinutes();
    this.second = now.getSeconds();
  }

  /**
   * draw a string to the canvas
   * @param {char[][]} canvas
   * @param {string} str string to show
   * @param {number} x x value of the start point
   * @param {number} y y value of the start point
   */
  drawString (canvas, str = '', x = 0, y = 0) {
    for (let i = 0; i < str.length; i++) {
      if (
        x >= 0 &&
        x + i < this.canvasWidth &&
        y >= 0 &&
        y < this.canvasHeight
      ) {
        canvas[y][x + i] = str.charAt(i);
      }
    }
  }

  /**
   * draw a clock to the canvas
   * @param {char[][]} canvas
   */
  drawClock (canvas) {
    this.updateCurrentTime();

    const hdeg = 90 - ((this.hour % 12)+ this.minute / 60.0) * 30.0;
    const hourX =
      this.centerX +
      this.scaleX * this.hourArmLength * Math.cos(this.toRad(hdeg));
    const hourY =
      this.centerY -
      this.scaleY * this.hourArmLength * Math.sin(this.toRad(hdeg));

    const mdeg = 90 - this.minute * 6.0;
    const minuteX =
      this.centerX +
      this.scaleX * this.minuteArmLength * Math.cos(this.toRad(mdeg));
    const minuteY =
      this.centerY -
      this.scaleY * this.minuteArmLength * Math.sin(this.toRad(mdeg));

    const sdeg = 90 - this.second * 6.0;
    const secondX =
      this.centerX +
      this.scaleX * this.secondArmLength * Math.cos(this.toRad(sdeg));
    const secondY =
      this.centerY -
      this.scaleY * this.secondArmLength * Math.sin(this.toRad(sdeg));

    this.drawLine(
      canvas,
      this.centerX,
      this.centerY,
      secondX,
      secondY,
      F12Clock.secondHandChar
    );
    this.drawLine(
      canvas,
      this.centerX,
      this.centerY,
      minuteX,
      minuteY,
      F12Clock.minuteHandChar
    );
    this.drawLine(
      canvas,
      this.centerX,
      this.centerY,
      hourX,
      hourY,
      F12Clock.hourHandChar
    );

    // String.padStart : ES2017 or later
    const txt =
      String(this.hour).padStart(2, '0') +
      ':' +
      String(this.minute).padStart(2, '0') +
      ':' +
      String(this.second).padStart(2, '0');

    this.drawString(canvas, 'O', this.centerX, this.centerY);
    if (undefined !== this.options.showDigitalStrings) {
      this.drawString(canvas, txt, 0, 0);
    }
    if (undefined !== this.options.showClockFace) {
      this.drawString(canvas, '12', this.centerX, 0);
      this.drawString(canvas, '6', this.centerX, this.canvasHeight - 1);
      this.drawString(canvas, '9', 0, this.centerY);
      this.drawString(canvas, '3', this.canvasWidth - 1, this.centerY);
    }
  }

  /**
   * create a canvas, render a clock face to it, and returns them as string array
   * @returns {string[]} a clock rendered to an array of strings
   */
  createComments () {
    const canvas = this.createCanvas();

    this.drawClock(canvas);

    const buf = [];
    for (let i = 0; i < this.canvasHeight; i++) {
      buf[i] = canvas[i].join('');
    }
    return buf
  }

  /**
   * create DOM to hold comments.
   * @returns an array of comment nodes
   */
  createCommentNodes () {
    const comments = this.createComments();
    const nodes = [];
    for (let i = 0; i < this.canvasHeight; i++) {
      nodes[i] = document.createComment(comments[i]);
    }
    return nodes
  }

  /**
   * update comment nodes
   */
  updateCommentNodes () {
    const comments = this.createComments();
    for (let i = 0; i < this.prevNodes.length; i++) {
      this.prevNodes[i].nodeValue = comments[i];
    }
  }

  /**
   * create an initial view
   */
  createView () {
    const newNodes = this.createCommentNodes();
    for (let i = 0; i < this.canvasHeight; i++) {
      this.f12clockNode.appendChild(newNodes[i]);
    }
    this.prevNodes = newNodes;
  }

  /**
   * start updating
   */
  start () {
    setInterval(this.updateCommentNodes.bind(this), 1000);
  }
}

// execute clock
new F12Clock(); // eslint-disable-line no-new
exports.F12Clock=F12Clock;Object.defineProperty(exports,'__esModule',{value:true});return exports;})({});//# sourceMappingURL=f12-clock.js.map

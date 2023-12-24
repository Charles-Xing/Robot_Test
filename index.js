// define the class "Grid" "Robot" 

// class "Grid", methods isInside markScent hasScent
class Grid {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.scents = new Set();
  }

  isInside(x, y) {
    return x >= 0 && x <= this.width && y >= 0 && y <= this.height;
  }

  markScent(x, y) {
    this.scents.add(`${x},${y}`);
  }

  hasScent(x, y) {
    return this.scents.has(`${x},${y}`);
  }
}

// class "Robot"
class Robot {
  // initialize properties
  constructor(x, y, direction, grid) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.grid = grid;
    this.lost = false;
  }

  execute(command) {
    switch (command) {
      case 'L':
        this.turnLeft();
        break;
      case 'R':
        this.turnRight();
        break;
      case 'F':
        this.moveForward();
        break;
      // unexpected command
      default:
        console.log(`Invalid command: ${command}`);
    }

    if (!this.grid.isInside(this.x, this.y)) {
      this.grid.markScent(this.x, this.y);
      this.lost = true;
      this.moveBackInside();
    }
  }

  turnLeft() {
    const directions = ['N', 'W', 'S', 'E'];
    this.orientation = directions[(directions.indexOf(this.orientation) + 1) % 4];
  }

  turnRight() {
    const directions = ['N', 'E', 'S', 'W'];
    this.orientation = directions[(directions.indexOf(this.orientation) + 1) % 4];
  }

  // the lost robot will move back to the last valid position
  moveForward() {
    switch (this.orientation) {
      case 'N':
        this.y++;
        break;
      case 'E':
        this.x++;
        break;
      case 'S':
        this.y--;
        break;
      case 'W':
        this.x--;
        break;
    }
  }

  toString() {
    return `${this.x} ${this.y} ${this.orientation}${this.lost ? ' LOST' : ''}`;
  }
}

// 创建一个 Robot 实例
function processInput(input) {
  // get width and height from the first element of the array
  const [width, height] = input[0].split(' ').map(Number);
  const grid = new Grid(width, height);

  const [x, y, orientation] = input[1].split(' ');
  const commands = input[2];
  const robot = new Robot(parseInt(x), parseInt(y), orientation, grid);

  for (const command of commands) {
    robot.execute(command);
    if (robot.lost) break;
  }

  console.log(robot.toString());
}

// the robot
const input = [
  '5 3',        // grid
  '1 1 E',      // initial state
  'RFRFRFRF'    // commands
];
processInput(input);
import IntervalManager from '../managers/interval.manager.js';

const MAX_PLAYERS = 2;

class Game {
  constructor(id) {
    this.id = id;
    this.users = [];
    this.intervalManager = new IntervalManager();
    this.state = 'waiting'; // 'waiting', 'inProgress'
  }

  addUser(user) {
    if (this.users.length >= MAX_PLAYERS) {
      throw new Error('Game session is full');
    }
    this.users.push(user);
    this.intervalManager.addPlayer(
      user.id,
      user.ping.bind(user), // intervalManager라는 객체 속에서 user 객체의 메서드를 실행할 때 실행 컨텍스트를 명시해주기 위함
      1000, // 1초마다 핑 측정
    );

    if (this.users.length === MAX_PLAYERS) {
      setTimeout(() => {
        this.startGame();
      }, 3000);
    }
  }

  getUser(userId) {
    return this.users.find((user) => user.id === userId);
  }

  removeUser(userId) {
    this.users = this.users.filter((user) => user.id !== userId);
    this.intervalManager.removePlayer(userId);

    if (this.users.length < MAX_PLAYERS) {
      this.state = 'waiting';
    }
  }

  startGame() {
    this.state = 'inProgress';
  }
}

export default Game;
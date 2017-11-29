const rand = n => Math.round(n * Math.random());
const coin = () => rand(2) > 1;
const rarely = () => rand(10) > 7;

function fail(test, reason) {
  return test() ? new Error(`Error: ${reason}`) : null;
}

function getPlayers(callback) {
  const players = ['Fry', 'Bender', 'Leela', 'Amy', 'Zoidberg'];
  setTimeout(() => callback(fail(coin, 'getPlayers'), players), 100);
}

function throwDice(callback) {
  setTimeout(() => callback(fail(rarely, 'throwDice'), 1 + rand(6)), 100);
}

const board = [];

function savePlayerScore(score, callback) {
  setTimeout(() => {
    if (coin())
      callback(new Error('Error: savePlayerScore'));
    else {
      board.push(score);
      callback(null);
    }
  }, 100);
}

function getScoreBoard(callback) {
  setTimeout(() => callback(fail(coin, 'getScoreBoard'), board), 100);
}

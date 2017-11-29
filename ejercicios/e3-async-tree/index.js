// -------------------------
// Utilities

const rand = n => Math.floor(Math.random() * n);
const coin = () => rand(100) > 50;

function repeat(fn, times) {
  const r = [];
  for (; times--; r.push(fn()));
  return r;
}

const delay = fn => (...args) => {
  setTimeout(() => fn(...args), rand(100));
}

// -------------------------
// Async Tree

class Node {
  getChildren(cb) {
    const children = repeat(
      () => (coin() ? new Node() : new Leaf()),
      rand(5)
    );
    setTimeout(() => cb(children), 0);
  }
}

class Leaf {
  constructor() { this.final = coin(); }
  isFinalLeaf() { return this.final; }
  getValue() { return this.final && rand(1000); }
  getNextLeaf(cb) {
    setTimeout(() => cb(new Leaf()), 0);
  }
}

const getRootNodes = cb => cb(repeat(() => new Node(), 10));

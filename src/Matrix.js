class Matrix {
  constructor({ rows = 1, columns = 1, initialValue = 0 }) {
    this.rows = rows;
    this.columns = columns;
    this.values = new Array(rows);

    this.initialize(initialValue);
  }

  initialize(initialValue) {
    if (typeof initialValue !== 'number') {
      throw new Error('initial value must be a number');
    }

    for (let i = 0; i < this.rows; i++) {
      this.values[i] = new Array(this.columns);
      for (var j = 0; j < this.columns; j++) {
        this.values[i][j] = initialValue;
      }
    }
  }

  add(matrix) {
    if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
      throw new Error('matrices being added must have same dimensions');
    } else if (!matrix) {
      throw new error('matrix cannot be undefined or null');
    }

    this.iterativelyApply(([i, j]) => this.values[i][j] + matrix.values[i][j]);
  }

  decrement(dec) {
    if (typeof dec !== 'number') {
      throw new Error('must decrement by a number');
    }
    this.iterativelyApply(([i, j]) => this.values[i][j] - dec);
  }

  entrywiseProduct(matrix) {
    this.iterativelyApply(([i, j]) => this.values[i][j] * matrix.values[i][j]);
  }

  increment(inc) {
    if (typeof inc !== 'number') {
      throw new Error('must increment by a number');
    }
    this.iterativelyApply(([i, j]) => this.values[i][j] + inc);
  }

  randomize(ceiling = 10, floor = 0) {
    if (typeof ceiling !== 'number' || typeof floor !== 'number') {
      throw new Error('ceiling and floor must be numbers');
    }
    this.iterativelyApply(() => Math.floor(Math.random() * ceiling + floor));
  }

  subtract(matrix) {
    if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
      throw new Error('matrices being subtracted must have same dimensions');
    } else if (!matrix) {
      throw new error('matrix cannot be undefined or null');
    }

    this.iterativelyApply(([i, j]) => this.values[i][j] - matrix.values[i][j]);
  }

  scale(scalar) {
    if (typeof scalar !== 'number') {
      throw new Error('scalar must be a number');
    }

    this.iterativelyApply(([i, j]) => this.values[i][j] * scalar);
  }

  iterativelyApply(operation) {
    if (typeof operation !== 'function') {
      throw new Error('operation must be a function');
    }

    this.values = this.values.map((row, i) =>
      row.map((_, j) => operation([i, j]))
    );
  }
}

export default Matrix;

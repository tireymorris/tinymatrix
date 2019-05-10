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

  add(other) {
    if (this.rows !== other.rows || this.columns !== other.columns) {
      throw new Error('matrices being added must have same dimensions');
    } else if (!other) {
      throw new error('matrix cannot be undefined or null');
    }

    this.iterativelyApply(([i, j]) => this.values[i][j] + other.values[i][j]);
  }

  decrement(dec) {
    if (typeof dec !== 'number') {
      throw new Error('must decrement by a number');
    }
    this.iterativelyApply(([i, j]) => this.values[i][j] - dec);
  }

  entrywiseProduct(other) {
    this.iterativelyApply(([i, j]) => this.values[i][j] * other.values[i][j]);
  }

  increment(inc) {
    if (typeof inc !== 'number') {
      throw new Error('must increment by a number');
    }
    this.iterativelyApply(([i, j]) => this.values[i][j] + inc);
  }

  // Returns a new matrix with the number of rows of matrixOne
  // And the number of columns of matrixTwo
  // Uses dot product to calculate result matrix values
  static multiply(matrixOne, matrixTwo) {
    if (matrixOne.columns !== matrixTwo.rows) {
      throw new Error(
        'matrix one must have the same number of columns as matrix two has rows'
      );
    }

    const result = new Matrix({
      rows: matrixOne.rows,
      columns: matrixTwo.columns
    });

    // Calculate dot product of each row of A
    // and each column of B
    for (let i = 0; i < result.rows; i++) {
      for (let j = 0; j < result.columns; j++) {
        let sum = 0;
        for (let k = 0; k < matrixOne.columns; k++) {
          sum += matrixOne.values[i][k] * matrixTwo.values[k][j];
        }
        result.values[i][j] = sum;
      }
    }

    return result;
  }

  randomize(ceiling = 10, floor = 0) {
    if (typeof ceiling !== 'number' || typeof floor !== 'number') {
      throw new Error('ceiling and floor must be numbers');
    }
    this.iterativelyApply(() => Math.floor(Math.random() * ceiling + floor));
  }

  static transpose(matrix) {
    const result = new Matrix({ rows: matrix.columns, columns: matrix.rows });

    for (let i = 0; i < result.rows; i++) {
      for (let j = 0; j < result.columns; j++) {
        result.values[i][j] = matrix.values[j][i];
      }
    }

    return result;
  }

  subtract(other) {
    if (this.rows !== other.rows || this.columns !== other.columns) {
      throw new Error('matrices being subtracted must have same dimensions');
    } else if (!other) {
      throw new error('matrix cannot be undefined or null');
    }

    this.iterativelyApply(([i, j]) => this.values[i][j] - other.values[i][j]);
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

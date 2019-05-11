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

  static add(matrixOne, matrixTwo) {
    if (
      matrixOne.rows !== matrixTwo.rows ||
      matrixOne.columns !== matrixTwo.columns
    ) {
      throw new Error('matrices being added must have same dimensions');
    } else if (!matrixOne || !matrixTwo) {
      throw new Error('matrices cannot be undefined or null');
    }

    return Matrix.map(
      matrixOne,
      ([i, j]) => matrixOne.values[i][j] + matrixTwo.values[i][j]
    );
  }

  static clone(matrix) {
    const result = new Matrix({ rows: matrix.rows, columns: matrix.columns });
    result.values = JSON.parse(JSON.stringify(matrix.values));

    return result;
  }

  static decrement(matrix, dec) {
    if (typeof dec !== 'number') {
      throw new Error('must decrement by a number');
    }
    return Matrix.map(matrix, ([i, j]) => matrix.values[i][j] - dec);
  }

  static entrywiseProduct(matrixOne, matrixTwo) {
    return Matrix.map(
      matrixOne,
      ([i, j]) => matrixOne.values[i][j] * matrixTwo.values[i][j]
    );
  }

  static fromArray(array) {
    if (!array instanceof Array) {
      throw new Error('fromArray input must be an array');
    }

    // convert array to vector
    const matrix = new Matrix({ rows: array.length, columns: 1 });
    for (let i = 0; i < array.length; i++) {
      matrix.values[i][0] = array[i];
    }

    return matrix;
  }

  static increment(matrix, inc) {
    if (typeof inc !== 'number') {
      throw new Error('must increment by a number');
    }

    return Matrix.map(matrix, ([i, j]) => matrix.values[i][j] + inc);
  }

  static map(matrix, operation) {
    if (typeof operation !== 'function') {
      throw new Error('operation must be a function');
    }

    const result = Matrix.clone(matrix);
    result.values = result.values.map((row, i) =>
      row.map((_, j) => operation([i, j], result))
    );
    return result;
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

  static randomize(matrix, ceiling = 10, floor = 0) {
    if (typeof ceiling !== 'number' || typeof floor !== 'number') {
      throw new Error('ceiling and floor must be numbers');
    }
    return Matrix.map(matrix, () =>
      Math.floor(Math.random() * ceiling + floor)
    );
  }

  static scale(matrix, scalar) {
    if (typeof scalar !== 'number') {
      throw new Error('scalar must be a number');
    }

    return Matrix.map(matrix, ([i, j]) => matrix.values[i][j] * scalar);
  }

  static subtract(matrixOne, matrixTwo) {
    if (
      matrixOne.rows !== matrixTwo.rows ||
      matrixOne.columns !== matrixTwo.columns
    ) {
      throw new Error('matrices being added must have same dimensions');
    } else if (!matrixOne || !matrixTwo) {
      throw new Error('matrices cannot be undefined or null');
    }

    return Matrix.map(
      matrixOne,
      ([i, j]) => matrixOne.values[i][j] - matrixTwo.values[i][j]
    );
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
}

export default Matrix;

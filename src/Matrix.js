class Matrix {
  constructor({ rows = 1, columns = 1, initialValue = 0 }) {
    this.rows = rows;
    this.columns = columns;
    this.values = new Array(rows);

    this.initialize(initialValue);
  }

  initialize(initialValue) {
    for (let i = 0; i < this.rows; i++) {
      this.values[i] = new Array(this.columns);
      for (var j = 0; j < this.columns; j++) {
        this.values[i][j] = initialValue;
      }
    }
  }

  scale(scalar) {
    this.iterativelyApply(([i, j]) => this.values[i][j] * scalar);
  }

  iterativelyApply(operation) {
    this.values = this.values.map((row, i) =>
      row.map((_, j) => operation([i, j]))
    );
  }
}

export default Matrix;

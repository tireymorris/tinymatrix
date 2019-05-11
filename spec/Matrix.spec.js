import Matrix from '../src/Matrix';

const expectAllValuesToPass = (matrix, expectation) => {
  matrix.values.forEach(row => row.forEach(value => expectation(value)));
};

describe('Matrix', () => {
  describe('initializes', () => {
    test('uses initial value and rows/columns', () => {
      let matrix = new Matrix({ rows: 5, columns: 5 });
      expectAllValuesToPass(matrix, value => expect(value).toEqual(0));

      matrix = new Matrix({ rows: 2, columns: 2, initialValue: 5 });
      expectAllValuesToPass(matrix, value => expect(value).toEqual(5));
      expect(matrix.values.length === matrix.rows);
      expect(matrix.values[0].length === matrix.columns);
    });
  });

  describe('add', () => {
    test('adds matrices', () => {
      const matrixOne = new Matrix({ rows: 3, columns: 3, initialValue: 2 });
      const matrixTwo = new Matrix({ rows: 3, columns: 3, initialValue: 4 });

      expectAllValuesToPass(Matrix.add(matrixOne, matrixTwo), value =>
        expect(value).toEqual(6)
      );
      expectAllValuesToPass(matrixOne, value => expect(value).toEqual(2));
    });
  });

  describe('decrement', () => {
    test('decrements by a scalar', () => {
      const matrixOne = new Matrix({ rows: 3, columns: 3, initialValue: 2 });

      expectAllValuesToPass(Matrix.decrement(matrixOne, 7), value =>
        expect(value).toEqual(-5)
      );
    });
  });

  describe('entrywiseProduct', () => {
    test('multiplies elements of both matrices', () => {
      const matrixOne = new Matrix({ rows: 2, columns: 2, initialValue: 2 });
      const matrixTwo = new Matrix({ rows: 2, columns: 2, initialValue: 2 });

      expectAllValuesToPass(
        Matrix.entrywiseProduct(matrixOne, matrixTwo),
        value => expect(value).toEqual(4)
      );
    });
  });

  describe('fromArray', () => {
    test('converts array to 1 column matrix / vector', () => {
      const arrayVector = [1, 2, 3];
      const vector = Matrix.fromArray(arrayVector);
      expect(vector.values).toEqual([[1], [2], [3]]);
    });
  });

  describe('increment', () => {
    test('increments by a scalar', () => {
      const matrixOne = new Matrix({ rows: 3, columns: 3, initialValue: 2 });

      expectAllValuesToPass(Matrix.increment(matrixOne, 7), value =>
        expect(value).toEqual(9)
      );
    });
  });

  describe('multiply', () => {
    test('correctly multiplies two simple matrices', () => {
      const matrixOne = new Matrix({ rows: 1, columns: 2 });
      const matrixTwo = new Matrix({ rows: 2, columns: 3 });

      matrixOne.values = [[1, 2]];
      matrixTwo.values = [[1, 2, 3], [4, 5, 6]];

      const expectedResult = [[9, 12, 15]];
      const resultMatrix = Matrix.multiply(matrixOne, matrixTwo);
      expect(resultMatrix.values).toEqual(expectedResult);
    });

    test('correctly multiplies two (slightly more) complex matrices', () => {
      const matrixOne = new Matrix({ rows: 4, columns: 2 });
      const matrixTwo = new Matrix({ rows: 2, columns: 4 });

      matrixOne.values = [[-3, 2], [-1, 3], [0, 1], [4, -2]];
      matrixTwo.values = [[5, 6, -3, 2], [7, 8, 9, 3]];

      const expectedResult = [
        [-1, -2, 27, 0],
        [16, 18, 30, 7],
        [7, 8, 9, 3],
        [6, 8, -30, 2]
      ];

      const resultMatrix = Matrix.multiply(matrixOne, matrixTwo);
      expect(resultMatrix.values).toEqual(expectedResult);
    });
  });

  describe('randomize', () => {
    test('generates random values', () => {
      const matrix = new Matrix({ rows: 15, columns: 15 });

      const result = Matrix.randomize(matrix);

      expectAllValuesToPass(result, value => {
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThanOrEqual(9);
      });
    });
  });

  describe('scale', () => {
    test('scales matrix according to scalar value', () => {
      let matrix = new Matrix({ rows: 3, columns: 3, initialValue: 9 });

      matrix = Matrix.scale(matrix, 3);
      expectAllValuesToPass(matrix, value => expect(value).toEqual(27));
    });
  });

  describe('subtract', () => {
    test('subtracts matrices', () => {
      const matrixOne = new Matrix({ rows: 3, columns: 3, initialValue: 2 });
      const matrixTwo = new Matrix({ rows: 3, columns: 3, initialValue: 4 });

      expectAllValuesToPass(Matrix.subtract(matrixOne, matrixTwo), value =>
        expect(value).toEqual(-2)
      );
    });
  });

  describe('transpose', () => {
    test('transposes a matrix', () => {
      const matrix = new Matrix({ rows: 2, columns: 3 });

      matrix.values = [[1, 2, 3], [4, 5, 6]];

      const transposedMatrix = Matrix.transpose(matrix);
      expect(transposedMatrix.values).toEqual([[1, 4], [2, 5], [3, 6]]);
      expect(Matrix.transpose(transposedMatrix).values).toEqual(matrix.values);
    });
  });

  describe('toArray', () => {
    test('converts 1 column matrix / vector to array', () => {
      const matrix = new Matrix({ rows: 3, columns: 1 });
      matrix.values = [[1], [2], [3]];

      expect(Matrix.toArray(matrix)).toEqual([1, 2, 3]);
    });
  });

  describe('map', () => {
    test('correctly sets values in matrix', () => {
      let matrix = new Matrix({ rows: 3, columns: 3, initialValue: 1 });

      const result = Matrix.map(
        matrix,
        ([i, j]) => (matrix.values[i][j] = -matrix.values[i][j])
      );

      expectAllValuesToPass(result, value => expect(value).toEqual(-1));
    });

    test.skip("doesn't mutate original matrix", () => {
      let matrix = new Matrix({ rows: 3, columns: 3, initialValue: 1 });

      Matrix.map(
        matrix,
        ([i, j]) => (matrix.values[i][j] = -9001 * matrix.values[i][j])
      );

      expectAllValuesToPass(matrix, value => expect(value).toEqual(1));
    });
  });
});

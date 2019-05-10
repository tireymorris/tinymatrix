import Matrix from '../src/Matrix';

const expectAllValuesToPass = (matrix, expectation) => {
  matrix.values.forEach(row => row.forEach(value => expectation(value)));
};

describe('Matrix', () => {
  describe('initializes', () => {
    test(' uses initial value and rows/columns', () => {
      let matrix = new Matrix({ rows: 5, columns: 5 });
      matrix.values.forEach(row =>
        row.forEach(value => expect(value).toEqual(0))
      );

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

      matrixOne.add(matrixTwo);

      expectAllValuesToPass(matrixOne, value => expect(value).toEqual(6));
    });
  });

  describe('decrement', () => {
    test('decrements by a scalar', () => {
      const matrixOne = new Matrix({ rows: 3, columns: 3, initialValue: 2 });

      matrixOne.decrement(7);

      expectAllValuesToPass(matrixOne, value => expect(value).toEqual(-5));
    });
  });

  describe('entrywiseProduct', () => {
    test('multiplies elements of both matrices', () => {
      const matrixOne = new Matrix({ rows: 2, columns: 2, initialValue: 2 });
      const matrixTwo = new Matrix({ rows: 2, columns: 2, initialValue: 2 });

      matrixOne.entrywiseProduct(matrixTwo);

      expectAllValuesToPass(matrixOne, value => expect(value).toEqual(4));
    });
  });

  describe('increment', () => {
    test('increments by a scalar', () => {
      const matrixOne = new Matrix({ rows: 3, columns: 3, initialValue: 2 });

      matrixOne.increment(7);

      expectAllValuesToPass(matrixOne, value => expect(value).toEqual(9));
    });
  });

  describe('multiply', () => {
    test('correctly multiplies two simple matrices', () => {
      const matrixOne = new Matrix({ rows: 1, columns: 2 });
      const matrixTwo = new Matrix({ rows: 2, columns: 3 });

      matrixOne.values = [[1, 2]];
      matrixTwo.values = [[1, 2, 3], [4, 5, 6]];

      const expectedResult = [[9, 12, 15]];
      expect(Matrix.multiply(matrixOne, matrixTwo).values).toEqual(
        expectedResult
      );
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
      expect(Matrix.multiply(matrixOne, matrixTwo).values).toEqual(
        expectedResult
      );
    });
  });

  describe('randomize', () => {
    test('generates random values', () => {
      const matrix = new Matrix({ rows: 15, columns: 15 });

      matrix.randomize();

      expectAllValuesToPass(matrix, value => {
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThanOrEqual(9);
      });
    });
  });

  describe('scale', () => {
    test('scales matrix according to scalar value', () => {
      let matrix = new Matrix({ rows: 3, columns: 3, initialValue: 9 });

      matrix.scale(3);
      expectAllValuesToPass(matrix, value => expect(value).toEqual(27));
    });
  });

  describe('subtract', () => {
    test('subtracts matrices', () => {
      const matrixOne = new Matrix({ rows: 3, columns: 3, initialValue: 2 });
      const matrixTwo = new Matrix({ rows: 3, columns: 3, initialValue: 4 });

      matrixOne.subtract(matrixTwo);

      expectAllValuesToPass(matrixOne, value => expect(value).toEqual(-2));
    });
  });

  describe('iterativelyApply', () => {
    test('correctly sets values in matrix', () => {
      let matrix = new Matrix({ rows: 3, columns: 3, initialValue: 1 });

      matrix.iterativelyApply(
        ([i, j]) => (matrix.values[i][j] = -matrix.values[i][j])
      );

      expectAllValuesToPass(matrix, value => expect(value).toEqual(-1));
    });
  });
});

import Matrix from '../src/Matrix';

describe('Matrix', () => {
  describe('initializes', () => {
    test(' uses initial value and rows/columns', () => {
      let matrix = new Matrix({ rows: 5, columns: 5 });
      matrix.values.forEach(row =>
        row.forEach(value => expect(value).toEqual(0))
      );

      matrix = new Matrix({ rows: 2, columns: 2, initialValue: 5 });
      matrix.values.forEach(row =>
        row.forEach(value => expect(value).toEqual(5))
      );
    });
  });

  describe('scale', () => {
    test('scales matrix according to scalar value', () => {
      let matrix = new Matrix({ rows: 3, columns: 3, initialValue: 9 });

      matrix.scale(3);
      matrix.values.forEach(row =>
        row.forEach(value => expect(value).toEqual(27))
      );
    });
  });

  describe('iterativelyApply', () => {
    let matrix = new Matrix({ rows: 3, columns: 3, initialValue: 1 });

    matrix.iterativelyApply(
      ([i, j]) => (matrix.values[i][j] = -matrix.values[i][j])
    );

    matrix.values.forEach(row =>
      row.forEach(value => expect(value).toEqual(-1))
    );
  });
});

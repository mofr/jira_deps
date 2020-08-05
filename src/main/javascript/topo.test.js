import toposort, {CircularDependencyError} from './topo'

test('simple integers 1', () => {
    expect(toposort([
        [2, [11]],
        [9, [11, 8]],
        [10, [11, 3]],
        [11, [7, 5]],
        [8, [7, 3]],
    ])).toStrictEqual([
        [3, 5, 7],
        [8, 11],
        [2, 9, 10],
    ]);
});

test('simple integers 2', () => {
    expect(toposort([
        [1, [2]],
        [3, [4]],
        [5, [6]],
    ])).toStrictEqual([
        [2, 4, 6],
        [1, 3, 5],
    ]);
});

test('simple strings', () => {
    expect(toposort([
        ['2', ['11']],
        ['9', ['11', '8']],
        ['10', ['11', '3']],
        ['11', ['7', '5']],
        ['8', ['7', '3']],
    ])).toStrictEqual([
        ['3', '5', '7'],
        ['8', '11'],
        ['2', '9', '10'],
    ]);
});

test('ignore self dependencies', () => {
    expect(toposort([
        [2, [11]],
        [9, [11, 8]],
        [10, [10, 11, 3]],  // self-reference is here
        [11, [7, 5]],
        [8, [7, 3]],
    ])).toStrictEqual([
        [3, 5, 7],
        [8, 11],
        [2, 9, 10],
    ]);
});

test('single node without links', () => {
    expect(toposort([
        [2, []],
    ])).toStrictEqual([
        [2],
    ]);
});

test('multiple nodes without links', () => {
    expect(toposort([
        [2, []],
        [3, []],
        [5, []],
    ])).toStrictEqual([
        [2, 3, 5],
    ]);
});

test('single self link', () => {
    expect(toposort([
        [2, [2]],
    ])).toStrictEqual([
        [2],
    ]);
});

test('empty', () => {
    expect(toposort([])).toStrictEqual([]);
});

test('input not modified', () => {
    const input = [
        [2, [11]],
        [9, [11, 8]],
        [10, [10, 11, 3]],
    ];
    toposort(input);
    expect(input).toStrictEqual([
        [2, [11]],
        [9, [11, 8]],
        [10, [10, 11, 3]],
    ]);
});

test('cycle', () => {
    expect(() => {
        toposort([
            [1, [2]],
            [2, [3]],
            [3, [1]],
        ]);
    }).toThrow(CircularDependencyError);
});
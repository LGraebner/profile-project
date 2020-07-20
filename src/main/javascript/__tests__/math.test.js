const sum = (a, b) => a + b

describe('Add test', () => {
    test('Adding 1 + 1 equals 2', () => {
    expect(sum(1, 1)).toBe(2)
    })
});

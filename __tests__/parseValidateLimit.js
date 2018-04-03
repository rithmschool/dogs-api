const { parseValidateLimit } = require('../helpers');

describe('parseValidateLimit', () => {
  it('should convert string input to number', () => {
    expect(parseValidateLimit('5')).toBe(5);
  });
  it('should handle strings that are not valid numbers', () => {
    expect(parseValidateLimit('lizard')).toBe(null);
  });
});

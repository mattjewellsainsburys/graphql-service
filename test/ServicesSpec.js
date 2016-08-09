import { describe } from 'mocha';
import assert from 'assert';
import { ValueOfService } from '../src/services'

describe('Value of Services', function () {
  it('resolves with the return value of the function passed in to the constructor', function () {
    const service = new ValueOfService(() => 42);
    const expected = 42;
    const actual = service.resolve();
    assert.equal(actual, expected);
  });
  it('passes any additional arguments to the function', () => {
    const service = new ValueOfService((a, b, c) => [a, b, c], 'a', 'b', 'c');

    const expected = ['a', 'b', 'c'];
    const actual = service.resolve();
    assert.equal(actual, expected);
  })
});

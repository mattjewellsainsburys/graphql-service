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
    assert.deepEqual(actual, expected);
  });
  it('passes any arguments passed at resolve time to the service', () => {
    const service = new ValueOfService((a, b, c) => [a, b, c]);

    const expected = ['a', 'b', 'c'];
    const actual = service.resolve('a', 'b', 'c');
    assert.deepEqual(actual, expected);
  });
  it('can use a combination of init and resolve time arguments', () => {
    const service = new ValueOfService((a, b, c, d) => [a, b, c, d], '1', '2');

    const expected = ['1', '2', 'a', 'b'];
    const actual = service.resolve('a', 'b');
    assert.deepEqual(actual, expected);
  });
});

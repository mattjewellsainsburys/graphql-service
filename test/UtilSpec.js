import {describe, it} from 'mocha';
import assert from 'assert';
import {safeAccessProperty} from '../src/util';

describe('safe access property', () => {
  it('can return a property of an object', () => {
    const expected = 'bar';
    const actual = safeAccessProperty({foo: 'bar'}, ['foo']);
    assert.equal(actual, expected);
  });
  it('returns null if the property is not present', () => {
    const expected = null;
    const actual = safeAccessProperty({foo: 'bar'}, ['baz']);
    assert.equal(actual, expected);
  });
  it('can find deeply nested properties', () => {
    const expected = 'admin';
    const request = {
      user: {
        role: 'admin'
      }
    };
    const actual = safeAccessProperty(request, ['user', 'role']);
    assert.equal(actual, expected);
  });
  it('returns null for deeply nested properties', () => {
    const expected = null;
    const request = {
      user: {
        role: 'admin'
      }
    };
    const actual = safeAccessProperty(request, ['user', 'role', 'slime']);
    assert.equal(actual, expected);
  })
});

import { describe, it } from 'mocha';
import assert from 'assert';
import schema from '../src/schema'
import { graphql } from 'graphql';

describe('Schema', () => {
  it('can hello world', async function () {
    const response = await graphql(schema, '{ hello }');
    const expected = 'world';
    const actual = response.data.hello;
    assert.equal(actual, expected);
  })
  it('fails at not being in the world', async function () {
    const response = await graphql(schema, '{ hello }');
    const expected = 'Mars';
    const actual = response.data.hello;
    assert.equal(actual, expected);
  })
});

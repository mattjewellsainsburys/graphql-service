import { describe, it } from 'mocha';
import assert from 'assert';
import { createSchema } from '../src/schema';
import { graphql } from 'graphql';
import { DummyValueService } from '../src/services';


describe('Counter', function () {
  it('returns whatever the service tells it to', async function () {
    const schema = createSchema({
      counterService: new DummyValueService(42)
    });
    const query = '{ counter }';
    const expected = 42;
    const actual = (await graphql(schema, query)).data.counter;
    assert.equal(actual, expected);
  });
  it('must return an int', async function () {
    const schema = createSchema({
      counterService: new DummyValueService("SLIME")
    });
    const query = '{ counter }';
    const result = await graphql(schema, query);

    assert.equal(result.data.ping, null, 'No data should be present');
    assert.ok(result.errors.length > 0, 'Error should be returned in the result');
  });
});


describe('Ping', function () {
  it('returns what it is told to', async function () {
    const schema = createSchema({
      pingService: new DummyValueService("pong")
    });
    const query = '{ ping }';
    const expected = 'pong';
    const actual = (await graphql(schema, query)).data.ping;

    assert.equal(actual, expected);
  });
});

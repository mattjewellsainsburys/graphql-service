import { describe, it } from 'mocha';
import { DummyValueService } from '../src/services';
import { composeRequiresRoles } from '../src/serviceDecorators';
import { UnauthorizedError } from '../src/errors';
import assert from 'assert';

/**
 * assumes an express "request" object throughout
 */
describe('Requires Role', function () {
  it('doesn\'t affect run if no roles are specified', ()=> {
    const request = {};
    const undecoratedService = new DummyValueService(42);
    const decoratedService = composeRequiresRoles(undecoratedService);

    const expected = undecoratedService.resolve(undefined, undefined, request);
    const actual = decoratedService.resolve(undefined, undefined, request);

    assert.equal(actual, expected);
  });
  it('throws an Unauthorized Error when a role is required', ()=> {
    const request = {};
    const service = composeRequiresRoles(new DummyValueService(42), 'user');

    assert.throws(() => service.resolve(undefined, undefined, request), UnauthorizedError);
  });
  it('doesn\'t throw an Error if the required role is present on the request user object', () => {
    const request = {user: {roles: ['user']}};
    const service = composeRequiresRoles(new DummyValueService(42), 'user');

    assert.doesNotThrow(() => service.resolve(undefined, undefined, request));
  });
  it('ignores roles which are not specified', () => {
    const request = {user: {roles: ['user', 'superman', 'cat woman']}};
    const service = composeRequiresRoles(new DummyValueService(42), 'user');
    assert.doesNotThrow(() => service.resolve(undefined, undefined, request));
  });
  it('can specify multiple required roles', () => {
    const notFabRequest = {user: {roles: ['user']}};
    const fabRequest = {user: {roles: ['user', 'John', 'Paul', 'George', 'Ringo']}};

    const service = composeRequiresRoles(new DummyValueService(42), 'user', 'John', 'Paul', 'George', 'Ringo');

    assert.throws(() => service.resolve(undefined, undefined, notFabRequest), UnauthorizedError);
    assert.doesNotThrow(() => service.resolve(undefined, undefined, fabRequest));
  });
});

import { UnauthorizedError } from './errors'
import { safeAccessProperty } from './util'


export const composeRequiresRoles = function (service, ...requiredRoles) {
  function requestHasRequiredRoles(request) {
    const userRoles = safeAccessProperty(request, ['user', 'roles']) || [];
    return hasAll(requiredRoles, userRoles);
  }

  function hasAll (a, b) {
    //noinspection JSUnusedAssignment
    let hasAllKeys = true;
    for (let i of a) {
      hasAllKeys = b.indexOf(i) > -1;
      if (!hasAllKeys) {
        break;
      }
    }
    return hasAllKeys;
  }

  return {
    resolve: function (parentValue, args, request) {
      if (!requestHasRequiredRoles(request)) {
        throw new UnauthorizedError();
      }
      return service.resolve.apply(service, arguments);
    }
  }
};

// for when you want to get property a.b.c.d of an object but aren't sure if it's there
// returns null if the property isn't there
//
// e.g. safeAccessProperty({foo: {bar: {baz: 'baz'}}}, ['foo', 'bar', 'baz']) => 'baz'
// safeAccessProperty({}, ['foo', 'bar', 'baz']) => null
export const safeAccessProperty = (obj, properties) => {
  if (obj === undefined || obj === null) {
    return;
  }
  if (properties.length === 0) {
    return obj;
  }
  return safeAccessProperty(obj[properties[0]], properties.slice(1));
};

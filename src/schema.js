import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString
} from 'graphql'

export const createSchema = function (services) {
  return new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: () => ({
        counter: modelOfType(GraphQLInt, services.counterService),
        ping: modelOfType(GraphQLString, services.pingService),
        bob: modelOfType(PersonType, services.bobService)
      })
    })
  });
};

var PersonType = new GraphQLObjectType({
  name: 'Person',
  fields: () => ({
    name: { type: GraphQLString }
  })
});

function modelOfType (type, service) {
  return {
    type: type,
    resolve: (parentValue, args, request) => service.resolve(parentValue, args, request)
  }
}

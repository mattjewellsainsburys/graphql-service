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
        ping: modelOfType(GraphQLString, services.pingService)
      })
    })
  });
};

function modelOfType (type, service) {
  return {
    type: type,
    resolve: () => service.resolve()
  }
}

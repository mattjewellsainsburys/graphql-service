import express from 'express';
import graphqlHTTP from 'express-graphql';

/**
 * Creates an express server with a single, graphQL endpoint
 * @param schema
 * @returns {*}
 */
export const createAppWithSchema = (schema) => {
  const app = express();

  app.use('/graphql', graphqlHTTP((request) => ({
    schema: schema,
    context: request,
    graphiql: true
  })));


  return app;
};

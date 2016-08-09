import express from 'express';
import graphqlHTTP from 'express-graphql';
import morgan from 'morgan';

/**
 * Creates an express server with a single, graphQL endpoint
 * @param schema
 * @returns {*}
 */
export const createAppWithSchema = (schema) => {
  const app = express();

  app.use(morgan('combined'));

  app.use(function (req, res, next) {
    req.user = {roles: ['user', 'admin', 'super-admin']};
    next();
  });

  app.use('/graphql', graphqlHTTP((request) => ({
    schema: schema,
    context: request,
    graphiql: true
  })));


  return app;
};

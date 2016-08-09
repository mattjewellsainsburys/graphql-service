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

  // TODO: obviously this isn't the best way to secure an API. proof of concept of role based access
  const currentlyValidTokens = {
    user: {roles: ['USER']},
    matt: {roles: ['USER', 'READ-BOB']}
  };
  app.use('/graphql', (req, res, next) => {
    const requestToken = req.get('Authorization');
    req.user = currentlyValidTokens[requestToken];
    console.log('req.user', req.user);
    next();
  });

  app.use('/graphql', graphqlHTTP((request) => ({
    schema: schema,
    context: request,
    graphiql: true
  })));


  return app;
};

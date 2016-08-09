import { graphql } from 'graphql';
import express from 'express';

/**
 * Creates an express server with a single, graphQL endpoint
 * @param schema
 * @returns {*}
 */
export const createAppWithSchema = (schema) => {
  const app = express();
  app.use(bodyParser.text({type: 'application/graphql'}));

  app.post('/graphql', async function (req, res) {
    const body = req.body;
    const result = await graphql(schema, body);
    res.send(result);
  });

  return app;
};

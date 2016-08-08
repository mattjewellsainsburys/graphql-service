import express from 'express';
import schema from './schema';
import { graphql } from 'graphql';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.HTTP_PORT || 3000;

app.use(bodyParser.text({type: 'application/graphql'}));
// Eslint doesn't like async function
//noinspection Eslint
app.post('/graphql', async function (req, res) {
  const body = req.body;
  const result = await graphql(schema, body);
  res.send(result);
});

const server = app.listen(PORT, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Listening at http://${host}:${port}`);
});

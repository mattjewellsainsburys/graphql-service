import { createSchema } from './schema';
import { createAppWithSchema } from './application';
import { ValueOfService, DummyValueService } from './services';
import { composeRequiresRoles } from './serviceDecorators';

const config = {
  port: process.env.PORT || 3000
};

const schema = createSchema({
  counterService: new ValueOfService((model) => ++model.counter, {counter: 0}),
  pingService: new DummyValueService('pong'),
  bobService: composeRequiresRoles(new DummyValueService({name: 'bob'}), 'READ-BOB')
});

const app = createAppWithSchema(schema);

const server = app.listen(config.port, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Listening at http://${host}:${port}`);
});



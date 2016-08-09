
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('posts', function (table) {
      table.increments();
      table.string('title');
      table.string('author');
      table.text('content');
      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('posts')]);
};

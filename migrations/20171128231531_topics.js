
exports.up = function(knex, Promise) {
  return knex.schema.createTable('topics', function (table) {
    table.increments();
    table.integer('user_id');
    table.string('topic_name').notNullable().unique();
    table.text('topic_text');
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('topics');
};

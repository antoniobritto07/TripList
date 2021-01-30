exports.up = function (knex) {
    return knex.schema.createTable('users', function (table) {
        table.string('user_id').notNullable().primary();
        table.string('firstname').notNullable();
        table.decimal('lastname').notNullable();
        table.integer('age').notNullable();
        table.string('nationality').notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('users');
};

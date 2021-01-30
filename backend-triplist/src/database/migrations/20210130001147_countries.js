exports.up = function (knex) {
    return knex.schema.createTable('countries', function (table) {
        table.increments('country_id').primary().notNullable();
        table.string('user_id').notNullable();
        table.string('name').notNullable();
        table.integer('times_visited').notNullable();
        table.boolean('favorite_country').notNullable();
        table.string('description').notNullable();

        table.foreign("user_id").references("user_id").inTable("users").onDelete("cascade");
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('countries');
};

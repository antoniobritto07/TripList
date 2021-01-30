exports.up = function (knex) {
    return knex.schema.createTable('cities', function (table) {
        table.increments('city_id').primary().notNullable();
        table.string('user_id').notNullable();
        table.string('country_id').notNullable();
        table.integer('name').notNullable();
        table.boolean('favorite_city').notNullable();
        table.string('description').notNullable();

        table.foreign("user_id").references("user_id").inTable("users").onDelete("cascade");
        table.foreign("country_id").references("country_id").inTable("countries").onDelete("cascade");
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('cities');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("movies", tbl=> {
        tbl.increments("movie_id")
        tbl.text("movie_name").notNullable()
        tbl.integer("release_year")
        tbl.text("genre")
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("movies")
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('movies').del()
  await knex('movies').insert([
    {movie_name: "The Chronicles of Narnia: The Lion, The Witch, and The Wardrobe", release_year: 2005, genre: "Fantasy"},
    {movie_name: "The Chronicles of Narnia: Prince Caspian", release_year: 2008, genre: "Fantasy"},
    {movie_name: "The Chronicles of Narnia: The Voyage of the Dawn Treader", release_year: 2010, genre: "Fantasy"}
  ]);
};

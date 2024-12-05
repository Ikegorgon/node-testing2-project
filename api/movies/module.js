const db = require('../../data/db-config')

function findAll() {
    return db('movies')
}

function findById(id) {
    return db('movies').where('movie_id', id)
}

function create(movie) {
    return db('movies').insert(movie)
}

function update(id, movie) {
    return db('movies').where('movie_id', id).update(movie)
}

function remove(id) {
    return db('movies').where('movie_id', id).delete()
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}
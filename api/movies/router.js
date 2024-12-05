const Router = require('express').Router()
const Movies = require('./module')
const Middleware = require('./middleware')

Router.get('/', (req, res, next) => {
    Movies.findAll()
        .then(movies => {
            res.status(200).json(movies)
        })
        .catch(next)
})

Router.get('/:id', Middleware.checkIdExists, (req, res, next) => {
    res.status(200).json(req.movie)
})

Router.post('/', Middleware.checkPayload, (req, res, next) => {
    Movies.create(req.body)
        .then(movie => {
            Movies.findById(movie[0])
                .then(newMovie => {
                    res.status(201).json(newMovie)
                })
        })
        .catch(next)
})

Router.put('/:id', Middleware.checkIdExists, Middleware.checkPayload, (req, res, next) => {
    Movies.update(req.params.id, req.body)
        .then(movie => {
            Movies.findById(req.params.id)
                .then(updatedMovie => {
                    res.status(201).json(updatedMovie)
                })
        })
        .catch(next)
})

Router.delete('/:id', Middleware.checkIdExists, (req, res, next) => {
    Movies.remove(req.params.id)
        .then(movie => {
            console.log(movie)
            res.status(200).json({message: "Movie removed"})
        })
        .catch(next)
})

module.exports = Router
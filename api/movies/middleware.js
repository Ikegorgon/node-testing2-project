const Movies = require('./module')

const checkIdExists = (req, res, next) => {
    Movies.findById(req.params.id)
        .then(movie => {
            if(movie.length === 0) {
                next({status:404, message: "Movie not found"})
            } else {
                req.movie = movie
                next()
            }
        })
        .catch(next)
}

const checkPayload = (req, res, next) => {
    if (!req.body.movie_name) {
        next({status: 422, message: "Movie requires a Name."})
    } else if (req.body.release_year && typeof req.body.release_year !== "number") {
        next({status: 422, message: "Movie release year is not a number."})
    } else {
        next()
    }
}

module.exports = {
    checkIdExists, 
    checkPayload
}
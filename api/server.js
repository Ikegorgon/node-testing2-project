const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const router = require('./movies/router')

const server = express()

server.use(express.json())
server.use(helmet())
server.use(cors())

server.use('/api/movies', router)
server.get('*', (req, res, next) => {
    next({status: 404, message: "Page not found."})
})
server.use((err, req, res, next) => {
    res.status(err.status || 500).json({message: err.message || "Unknown Error"})
})

module.exports = server;
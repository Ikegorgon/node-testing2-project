const knex = require('knex')
const config = require('../knexfile')
const env = process.env.NODE_ENV || 'development'

console.log(knex)

module.exports = knex(config[env])
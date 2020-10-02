const knex = require('knex')('production');
const knexFile = require('../knexfile')

module.exports = knex(knexFile[process.env.NODE_ENV])
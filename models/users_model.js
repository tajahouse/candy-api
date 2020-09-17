
const data = require('../database/config')

module.exports = {
	add,
	find,
	findBy,
	findById
}

async function add(user) {
	return await data('users').insert(user).select('id')
}

function find() {
	return data('users').select('id', 'username')
}

function findBy(filter) {
	return data('users').select('id', 'username', 'password').where(filter).returning('id', 'username')
}

function findById(id) {
	return data('users').select('id', 'username').where('users.id', id).first()
}



exports.seed = async function(knex) {
	await knex('users').insert([
	{ username: 'Friend', password: 'friend123' },
    { username: 'User', password: 'user123' },
    { username: 'Newb', password: 'newb123' },
	])
}

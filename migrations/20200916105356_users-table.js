
exports.up = async function(knex) {
  await  knex.schema
  .createTable('users', tbl =>{
      tbl.increments('id')
      tbl.text('username').unique().notNull()
      tbl.text('password').notNull()     
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTable('users')
};

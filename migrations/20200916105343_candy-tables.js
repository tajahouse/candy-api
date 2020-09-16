
exports.up = async function(knex) {
  await knex.schema
    .createTable('candy', tbl =>{
        tbl.increments('id')
        tbl.text('candy-name').unique().notNull()
        tbl.boolean('candy_vegan')
        tbl.text('candy_ingredients')
        tbl.integer('userID').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE')
    })
};

exports.down =  async function(knex) {
  await knex.schema.dropTableifExists('candy')
};

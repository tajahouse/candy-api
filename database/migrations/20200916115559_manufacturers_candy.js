
exports.up = async function(knex) {
  await knex.schema
    .createTable('manufacturers_candy', tbl =>{
        tbl.integer('candyID').references('id').inTable('candy').onDelete('CASCADE').onUpdate('CASCADE')
        tbl.integer('manufacturerID').references('id').inTable('manufacturers').onDelete('CASCADE').onUpdate('CASCADE')
        tbl.primary([ 'candyID', 'manufacturerID' ])
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTable('manufacturers_candy')
};

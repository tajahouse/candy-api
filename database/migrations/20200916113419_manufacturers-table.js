
exports.up = async function(knex) {
    await knex.schema
        .createTable('manufacturers', tbl =>{
            tbl.increments('id')
            tbl.text('manufacturer_name').notNull().unique()
            tbl.text('desc')
        })
};


exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('manufacturers')
};

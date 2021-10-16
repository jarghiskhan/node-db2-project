exports.up = function (knex) {
  // DO YOUR MAGIC
  return knex.schema.createTable("cars", tbl=>{
    tbl.increments();
    tbl.string("vin",20).unique().notNullable();
    tbl.string("make", 20).notNullable();
    tbl.string("model", 20).notNullable();
    tbl.integer("mileage").notNullable();
    tbl.string("title", 128)
    tbl.string("transmission",20)
  })
};

exports.down = function (knex) {
  // DO YOUR MAGIC
  return knex.schema.dropTableIfExists("cars")
};

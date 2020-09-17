exports.seed = async function (knex) {
  await knex("manufacturers_candy").insert([
    { candyID: 1, manufacturerID: 1 },
    { candyID: 2, manufacturerID: 1 },
    { candyID: 3, manufacturerID: 2 },
    { candyID: 4, manufacturerID: 2 },
  ]);
};

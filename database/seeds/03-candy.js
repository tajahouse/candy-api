exports.seed = async function (knex) {
  await knex("candy").insert([
    {
      candy_name: "M&Ms",
      candy_vegan: false,
      candy_ingredients: "sugar, chocolate, milk, cocoa butter",
      userID: 1,
    },
    {
      candy_name: "Skittles",
      candy_vegan: true,
      candy_ingredients: "sugar, corn syrup, kernel oil, fruit juice",
      userID: 1,
    },
    {
      candy_name: "Baby Ruth",
      candy_vegan: false,
      candy_ingredients: "sugar, chocolate, milk, cocoa butter",
      userID: 2,
    },
    {
      candy_name: "Laffy Taffy",
      candy_vegan: false,
      candy_ingredients: "sugar, palm oil, salt, natural flavor",
      userID: 2,
    },
  ]);
};

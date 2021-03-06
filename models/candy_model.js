const data = require("../database/config");

const getCandy = () => {
  return data("manufacturers_candy")
    .join(
      "manufacturers",
      "manufacturers.id",
      "manufacturers_candy.manufacturerID"
    )
    .join("candy", "candy.id", "manufacturers_candy.candyID")
    .join("users", "users.id", "candy.userID")
    .select(
      "users.username as user",
      "users.id as userID",
      "candy.id as candyID",
      "candy.candy_name as candy",
      "candy.candy_vegan as candyVegan",
      "candy.candy_ingredients as candyIngredients",
      "manufacturers.manufacturer_name as manufacturerName",
      "manufacturers.desc as manufacturerDescription"
    )
    .orderBy("candy.id");
};

const getCandyById = (id) => {
  return data("candy")
    .join("candy.id", id)
    .join("users", "users.id", "candy.userID")
    .join("manufacturers_candy", "manufacturers_candy.candyID", "candy.id")
    .join("candy", "candy.id", "manufacturers_candy.manufacturerID")
    .select(
       "users.id as userID",
       "users.username as user",
      "candy.id as candyID",
      "candy.candy_name as candy",
      "candy.candy_vegan as candyVegan",
      "candy.candy_ingredients as candyIngredients",
      "manufacturers.manufacturer_name as manufacturerName",
      "manufacturers.desc as manufacturerDescription"
    );
};

const getByManufacturer = (id) => {
  return data("manufacturers_candy")
    .where("manufacturers_candy.manufacturerID", id)
    .join("manufacturers", "manufacturers.id", "manufacturers_candy.candyID")
    .join("candy", "candy.id", "manufacturers_candy.candyID")
    .select(
      "candy.id",
      "candy.candy_name",
      "candy.candy_vegan",
      "candy.candy_ingredients"
    );
};

const getManufacturer = () => {
  return data("manufacturers").select(
    "manufacturers.id",
    "manufacturers.manufacturer_name",
    "manufacturers.desc"
  );
};
const findManufacturer = (name) => {
  return data("manufacturers").where("manufacturer.manufacturer_name", name);
};
const addManufacturer = (manufacturer) => {
  return data("manufacturers").insert("manufacturer");
};
const editManufacturer = (manufacturer, id) => {
  return data("manufacturers")
    .update(manufacturer)
    .where("manufacturer.id", id)
    .select("manufacturers");
};
const removeManufacturer = (id) => {
  return data("manufacturers")
    .delete("manufacturers")
    .where("manufacturers.id", id);
};

const addCandy = (post) => {
  return data("candy").insert(post).returning("candy.id");
};
const addToManufacturer = (manufacturer) => {
  return data("manufacturers_candy")
    .insert(manufacturer)
    .returning("manufacturers_candy.manufacturerID");
};
const findCandy = (name) => {
  return data("candy").where("candy.candy_name", name);
};

const editCandy = (candy, id) => {
  return data("candy")
    .update(candy)
    .where("candy.id", id)
    .select("candy.candy_name", "candy.candy_vegan", "candy.candy_ingredients");
};
const removeCandy = (id) => {
  return data("candy").delete("candy").where("candy.id", id).select("candy");
};

module.exports = {
  addCandy,
  addToManufacturer,
  findCandy,
  editCandy,
  removeCandy,
  getManufacturer,
  findManufacturer,
  addManufacturer,
  editManufacturer,
  removeManufacturer,
  getCandy,
  getCandyById,
  getByManufacturer,
};

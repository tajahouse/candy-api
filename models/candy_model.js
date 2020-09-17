const data = require('../database/config');

const getCandy = () =>{
    return data('manufacturers_candy')
        .join('manufacturers', 'manufacturers.id', 'manufacturers_candy.manufacturerID')
        .join('candy', 'candy.id', 'manufacturers_candy.candyID')
        .join('users', 'users.id', 'candy.userID')
        .select(
            'users.username as user',
            'user.userid as userID',
            'candy.id as candyID',
            'candy.candy_name as candy',
            'candy.candy_vegan as candyVegan',
            'candy.candy_ingredients as candyIngredients',
            'manufacturers.manufacturer_name as manufacturerName',
            'manufacturers.desc as manufacturerDescription'
        )
      .orderBy('candy.id')
}

const getCandyById = (id) =>{
    return data('candy')
        .join('candy.id', id)
        .join('users', 'users.id', 'candy.userID')
        .join('manufacturers_candy', 'manufacturers_candy.candyID', 'candy.id')
        .join('candy', 'candy.id', 'manufacturers_candy.manufacturerID')
        .select(
            'users.username as user',
            'user.userid as userID',
            'candy.id as candyID',
            'candy.candy_name as candy',
            'candy.candy_vegan as candyVegan',
            'candy.candy_ingredients as candyIngredients',
            'manufacturers.manufacturer_name as manufacturerName',
            'manufacturers.desc as manufacturerDescription'            
        )
}

const getByManufacturer =(id) =>{
    return data('manufacturers_candy')
    .where('manufacturers_candy.manufacturerID', id)
    .join('manufacturers', 'manufacturers.id', 'manufacturers_candy.candyID')
    .join('candy', 'candy.id', 'manufacturers_candy.candyID')
    .select(
        'candy.id',
        'candy.candy_name',
        'candy.candy_vegan',
        'candy.candy_ingredients'
    )
}

const getManufacturer = () =>{
    return data('manufacturers').select('manufacturers.id', 'manufacturers.manufacturer_name', 'manufacturers.desc')
}

const addCandy = (post) =>{
    return data('candy').insert(post).returning('candy.id')
}

const addToManufacturer = (manufacturer) =>{
    
}


const router = require('express').Router();
const Candy = require('../models/candy_model')
const { validateForm } = require('../middleware/index')

router.get('/manufacturers', async (req, res, next) => {
    try{
            res.status(200).json(await Candy.getManufacturer())
    } catch(err){
        next(err);
    }
})

router.get('/candy', async (req, res, next) => {
    try{
            res.status(200).json(await Candy.getCandy())
    } catch(err){
        next(err);
    }
})

module.exports = router;
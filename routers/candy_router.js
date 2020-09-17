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

router.get('/candy/:id', async (req, res, next) => {
    try{
        res.status(200).json(await Candy.getCandyById(req.params.id))
    } catch(err){
        next(err);
    }
})

router.get("mycandy/:id/candy", async (req, res, next)=>{
    try{
        const candySearch = await Candy.getByManufacturer(req.params.id)
        if (candySearch.length === 0){
            return res.status(404).json({ 
                message: `This candy doesn't exist for this user`
            })
        }
        res.status(200).json(candySearch)
    }catch (err) {
        next(err);
    }
})

module.exports = router;
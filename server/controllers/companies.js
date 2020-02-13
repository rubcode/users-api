const express = require('express');
const router = express.Router();

const {Companies} = require('../models/companies.js');

router.get('/saludo',(req,res)=>{
    res.send("Hola");
});

router.get('/read', (req, res) => {

    Companies
        .find()
        .exec()
        .then( allUsers => res.status(200).send(allUsers) )
        .catch( error => res.status(400).send(error) )
});

router.patch('/update/:id', (req, res) => {
    const { id } = req.params;
    const body = req.body
    Companies
        .findByIdAndUpdate(
            id,
            {$set:{
                ...body
            }},
            {useFindAndModify: false}
        )
        .exec()
        .then( updatedUsers => res.status(200).send(updatedUsers))
        .catch( error => res.status(400).send(error) )
});

router.post('/create', (req, res) => {
    const {
        name,
        nivel,
        logo,
    
    } = req.body;

    const newCompani = Companies({
        name: name,
        nivel: nivel,
        logo:logo,
        
    });

    newCompani
        .save((error, user) => {
            if(error){
                res.status(400).send({
                    error:error,
                    message: "Lo sentimos"
                })
            } else {
                res.status(201).send({
                    user:user,
                    message:"petición exitosa"
                })
            }
        })

})

module.exports = router;
const express = require('express');
const router = express.Router();

const { Users } = require('../models/users.js');


router.get('/saludo',(request, response) => {
    response.send('Hola');
})


router.patch('/update/:id', (req, res) => {
    const { id } = req.params;
    const body = req.body
    Users
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



router.get('/read/:id', (req, res) => {
    const { id } = req.params;

    Users
        .findById(id)
        .exec()
        .then( userById => res.status(200).send(userById))
        .catch( error => res.status(400).send(error) )

})

router.get('/read', (_req, res) => {

    Users
        .find()
        .exec()
        .then( allUsers => res.status(200).send(allUsers) )
        .catch( error => res.status(400).send(error) )
});

router.post('/create', (req, res) => {
    const {
        name,
        email,
        password,
        year,
    
    } = req.body;

    const newUser = Users({
        name: name,
        email: email,
        password:password,
        year:year,
        
    });

    newUser
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

movie
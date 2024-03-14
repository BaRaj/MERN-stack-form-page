const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const RegisterModel = require('./models/Register')

const app = express()

app.use(cors())
app.use(express.json()) //forced conversion to json


mongoose.connect('mongodb+srv://user1o:testpasss123@cluster0.y5mazfw.mongodb.net/');
app.post('/register',(req, res)=> {
    const {name,email,password} = req.body;
    
    RegisterModel.findOne({email:email}) 
    .then(user => {
        if(user) {
            res.json("User Already Exists")
        }
        else {
            RegisterModel.create({name:name,email:email,password:password})
            .then(result =>res.json("Account created Successfully"))
            .catch(err => res.json(err))
        }

    })
    .catch(err => res.json(err))
})

app.listen(3001,()=> {

    console.log("Server Online ")


})
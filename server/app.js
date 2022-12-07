const express = require('express');
const mongoose = require('mongoose');
const PORT = 3001;
const cors = require('cors')
const app = express()


require('dotenv').config()
const dataUrl = process.env.MONGODB_URI


// Middleware 

app.use(cors())
app.use(express.json())


// Models 
const User = require('./models/User.model');


// DataBase Connected 
const dataBase = dataUrl;
mongoose.connect(dataBase, { useNewUrlParser: true, useUnifiedTopology: true }).then(
    (result) => console.log('DataBase Connected')
).catch((error)=> console.log(error));



mongoose.set('strictQuery', false);

app.get('/', (req, res) => {
    res.json('Hello to my app');
})


app.post('/signup' ,(req, res) => {
    // Getting the user from body
    const password = req.body.password;
    const email = req.body.email;

    User.create({
        email: email,
        password: password,
      })
        .then((data) => {
            console.log(data);
            res.status(200).json('Token');
        })
        .catch((err) => {
            console.log(err);
        }); 
})


app.listen(PORT, () => console.log('server running on PORT ' + PORT))



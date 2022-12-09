const express = require('express');
const mongoose = require('mongoose');
const PORT = 3001;
const cors = require('cors');
const app = express();
const axios = require('axios');


// Accessing the path module
const path = require("path");



// Deploy Code from react build
app.use(express.static(path.resolve(__dirname, "./client/build")));

// app.get("*", function (request, response) {
//   response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
// });

//Mongoose Fix Deprecation Error
mongoose.set('strictQuery', true);

require('dotenv').config()
const dataUrl = process.env.MONGODB_URI

console.log(dataUrl);

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


app.post('/addUsers' ,(req, res) => {
   
    axios('https://randomuser.me/api/?results=20',{ 
        headers: { "Accept-Encoding": "gzip,deflate,compress" } 
    })
    .then( data => {
       const usersData = data.data.results;
       const emails = usersData.map(emails => emails.email);
       const passwords  = usersData.map(password => password.login.password);
       const largeImg =  usersData.map(password => password.picture.large);
       const gender = usersData.map(gender => gender.gender);
       const firstName = usersData.map(name => name.name.first);
       const age = usersData.map(age => age.dob.age); 


       console.log(gender);
       const dataUser = [];

       for (let index = 0; index < emails.length; index++) {

        const x1 = emails[index];
        const x2 = passwords[index];
        const x3 = largeImg[index];
        const x4 = gender[index];
        const x5 = firstName[index];
        const x6 = age[index];

        // Making a new object 
        dataUser.push({email:x1 , password:x2, imgLarge:x3, gender:x4, firstName:x5, age:x6 })
        
       }
     
       // Insert Users
            User.insertMany(dataUser).then(function(){
                console.log("Data inserted")  // Success
                res.status(200).json('UserAdded');
            }).catch(function(error){
                console.log(error)      // Failure
            });
    })
    .catch(error => console.error(error));

   
})


// Admin Show Current Users
app.get('/admincms', (req, res) => {
    User.find({}).then(data => {
        res.json(data);
    }).catch( error => {
        console.error(error);
    })
    
})


app.listen(PORT, () => console.log('server running on PORT ' + PORT))
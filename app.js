const express = require("express")
const mongoose = require('mongoose');

const app= express();
const PORT=process.env.PORT||4000;


const path = require('path')
app.use(express.static('public'))

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });



  
app.listen(PORT, ()=>{console.log("server running")});


app.get("/",(req,res,next)=>{
    //get form 
    res.sendFile('index.html', { root: __dirname });
})

app.post("/submitquestion",(req,res,next)=>{

    const conn = "mongodb+srv://wanhoyinjoshua:8sr^3B=81@cluster0.zccc4.mongodb.net/grannytell?retryWrites=true&w=majority";
const connection = mongoose.createConnection(conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Creates simple schema for a User.  The hash and salt are derived from the user's given password when they register
const UserSchema = new mongoose.Schema({
    question:String,
    email:String
});


const User = connection.model('questions', UserSchema);

const newquestion = new User({
    question: req.body.question,
    email: req.body.email
    
});

newquestion.save()
.then((user) => {
    res.sendFile('sucees.html', { root: __dirname });
})
.catch((error) => {
    res.sendFile('error.html', { root: __dirname });
  });
 

   
  



    //get form 
   
})
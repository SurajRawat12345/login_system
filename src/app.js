// Required modules / libraries
const express = require('express');
const morgan = require('morgan');
const Login = require('./models/modschema');
const {connectToDB , getDB} = require('./db/database');
const port = process.env.PORT || 3000;
const ejs = require('ejs');

// initializing app
const app = express();
let db;

// Connect DB & START SERVER ............................
connectToDB((err) =>{
    if(!err){
        app.listen(3000,() => {
            console.log(`Listening on port no ${port}`);
        })
        db = getDB();
    }
})

// Setting VIEWS for rendering .........................
app.set('view engine','ejs');
app.set('views','EjsDocs');

// MIDDLEWARES ..........................................;
app.use(express.static('public'))
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended : true}));

// Routes ...............................................

app.get('/',(req,res) =>{
    res.render('index');
})

app.get('/login' , (req,res) => {
    res.render('index');
})

app.post('/login',async(req,res) => {
    // to get entered username req.body.username;
    // to get entered password = req.body.password;
    try{
        const user = req.body.username;
        const pass = parseInt(req.body.password);
        // Await statement
        const key = await db.collection('login')
        .findOne({username : user, password : pass})         
        if(pass === key.password){
            res.status(200).render('Success');
        }            
        else{
            res.status(400).render('reject');
        }
    }                   
    catch(err){
        res.status(400).render('user404');
    }
})

app.get('/create_new_user', (req,res) => {
    res.render('create');
})

app.post('/create_new_user', (req,res) => {
    const login = new Login(req.body);
    // save() method is for mongoose
    db.collection('login').insertOne(login)
    .then((result) => {
        res.status(200).redirect('/login');
    })
    .catch((err) => {
        res.status(500).json({err : 'Unable to create user'});
    })
})
app.get('/back' ,(req,res) => {
    res.redirect('/login');
})
app.use('/',(req,res) => {
    res.render('Err404');
})
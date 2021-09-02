const express =require('express');
const ejs = require('ejs');
const path =require('path');
const { v4 : uuidv4} = require('uuid');
const PORT = process.env.PORT || 8000 ;
const app = express();


// setting a View Engine or middleware

app.set('view engine','ejs');
app.use(express.static(path.join(__dirname, 'public')));




app.get('/',(req,res)=>{

    res.redirect(uuidv4());
});

app.get('/:room',(req,res)=>{

    res.render('room',{
        roomid: req.params.room
    });
});


app.listen(PORT,()=>{

    console.log(`listing to the PORT ${PORT}`);
});
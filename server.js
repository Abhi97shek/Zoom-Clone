const express =require('express');
const ejs = require('ejs');
const socket = require('socket.io');
const path =require('path');
const { v4 : uuidv4} = require('uuid');
const app = express();
// const server = require('http').Server(app);

const PORT = process.env.PORT || 8000 ;

const server =app.listen(PORT,()=>{

    console.log(`listing to the PORT ${PORT}`);
});


const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server,{ debug:true });




const io = socket(server);
// setting a View Engine or middleware

app.set('view engine','ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/peerjs',peerServer);


io.on('connection',(socket)=>{

    console.log("connection established");

    socket.on('join-room',(roomId,userId)=>{


        socket.join(roomId);
       
        socket.broadcast.to(roomId).emit('user-connected',userId);

    });


});



app.get('/',(req,res)=>{

    res.redirect(uuidv4());
});

app.get('/:room',(req,res)=>{

    res.render('room',{
        roomid: req.params.room
    });
});



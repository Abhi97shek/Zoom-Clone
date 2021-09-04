const socket =io();



var peer = new Peer(undefined,{
    path:'/peerjs',
    host:'/',
    port:'8000'

}); 


let myvideoStream;

const videoGrid =document.getElementById('video-grid');
const myvideo = document.createElement('video');
myvideo.muted =true;


navigator.mediaDevices.getUserMedia({
    video:true,
    audio:true
}).then(stream=>{

    myvideoStream =stream;
    addVideoStream(myvideo,stream);

});


const addVideoStream = (video,stream)=>{
video.srcObject = stream;

video.addEventListener('loadedmetadata',()=>{

    video.play();
});

    videoGrid.append(video);

};

peer.on('open',(userid)=>{

    socket.emit('join-room',ROOM_ID,userid);

});


socket.on('user-connected',(userId)=>{


    console.log(`New User Connected ${userId}`);
});
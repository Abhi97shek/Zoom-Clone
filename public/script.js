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

peer.on('open',(userid)=>{

    socket.emit('join-room',ROOM_ID,userid);

});


navigator.mediaDevices.getUserMedia({
    video:true,
    audio:true
}).then(stream=>{

    myvideoStream =stream;
    addVideoStream(myvideo,stream);



    peer.on('call',(call)=>{

        call.answer(stream);
        const video = document.createElement('video');
        call.on('stream',userVideoStream=>{
    
            addVideoStream(video,userVideoStream);
        });
    });

    socket.on('user-connected',(userId)=>{

        const call =peer.call(userId,stream);
        const video = document.createElement('video');
        call.on('stream',userVideoStream=>{
    
            addVideoStream(video,userVideoStream);
        });
        console.log(`New User Connected ${userId}`);
    });

});


const addVideoStream = (video,stream)=>{
video.srcObject = stream;

video.addEventListener('loadedmetadata',()=>{

    video.play();
});

    videoGrid.append(video);

};



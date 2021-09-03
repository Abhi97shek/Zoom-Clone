const socket =io();

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
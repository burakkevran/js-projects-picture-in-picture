const videoElement = document.getElementById('video');
const button = document.getElementById('button');
const captureButton = document.getElementById('capture-button');
let inPIPmode = false;
let isCapturing = false;

// Prompt user to select a media stream, pass to video element and play
async function selectMediaStream () {

    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = () => {
            videoElement.play();
        }
        isCapturing = true;
    } catch (error) {
        console.log('Error: ', error);
        captureButton.disabled = false;
    }
}

button.addEventListener('click', async () => {
    if(inPIPmode){
        button.disabled = true;
        await document.exitPictureInPicture();
        button.disabled = false;
        inPIPmode = false;
    }else{
        button.disabled = true;
        await videoElement.requestPictureInPicture();
        button.disabled = false;
        inPIPmode = true;
    }
});

captureButton.addEventListener('click', () => {
    if(!isCapturing){
        captureButton.disabled = true;
        selectMediaStream();  
    }
});

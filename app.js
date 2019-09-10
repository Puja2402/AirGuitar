const modelParams = {
  flipHorizontal: true,   // flip e.g for video
  imageScaleFactor: 0.7,  // reduce input image size for gains in speed.
  maxNumBoxes: 1,        // maximum number of boxes to detect
  iouThreshold: 0.5,      // ioU threshold for non-max suppression
  scoreThreshold: 0.79,    // confidence threshold for predictions.
}
navigator.getUserMedia= navigator.getUserMedia||navigator.webkitGerUserMedia||navigator.mozGerUserMedia||navigator.msGerUserMedia;

const video=document.querySelector("#video");
const audio=document.querySelector("#audio");
let model;
handTrack.startVideo(video)
  .then(status=>{
    if(status){
      navigator.getUserMedia({video:{}},stream=>{
        video.srcObject=stream;
        //run detection
        setInterval(runDetection,300)
      },
      err=>console.log(err)
      );
    }
  });

function runDetection() {
  model.detect(video)
    .then(predictions=>{
    if(predictions.length!==0){
      let hand1=predictions[0].bbox;
      let x=hand1[0];
      let y=hand1[1];
      if(y>300){
        if(x<200){
          audio.src="a-chord.mp3";
        }else if(x>400){
          audio.src="e-chord.mp3";
        }else if(x>300){
          audio.src="c-chord.mp3";
        }else if(x>200){
          audio.src="b-chord.mp3";
        }
      }
      audio.play();
    }
  });
}
  handTrack.load(modelParams).then(lmodel=>{
    model=lmodel;
  })

//IGNORE ERROR
function test(detect) {      //defining a function
    if (detect === undefined) {       //if t=undefined, call tt
          console.log(detect)      //call t
    }
    return detect;
  }
  var a=10;    //a is a variable with undefined value
  console.log(test(a)); //function call

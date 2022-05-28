song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
score_left_wrist=0;
score_right_wrist=0;

function preload(){
    song=loadSound("music.mp3");
}

function setup(){
    canvas= createCanvas(600,500);
    canvas.center();

    video= createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("modal Loaded");
}

function draw(){
    image(video,0,0, 600, 500);

    if(score_left_wrist>0.2){
     fill('red');
    stroke('red');
    circle(leftWristX, leftWristY, 20);

    inLeftWristY= Number(leftWristY);
    remove_decimel= floor(inLeftWristY);

    volume= remove_decimel/500;

    document.getElementById("volume").innerHTML= "Volume= "+ volume;
    song.setVolume(volume);

    }

    if(score_right_wrist>0.2){
        fill("red");
        stroke("red");
        circle(rightWristX, rightWristY, 20);

        if(rightWristY>0 && rightWristY<=100){
            document.getElementById("Speed").innerHTML="Speed- 0.5x";
            song.rate(0.5);
        }
        else if(rightWristY>100 && rightWristY<=200){
            document.getElementById("Speed").innerHTML="Speed- 1x";
            song.rate(1);
        }
        else if(rightWristY>200 && rightWristY<=300){
            document.getElementById("Speed").innerHTML="Speed- 1.5x";
            song.rate(1.5);
        }
        else if(rightWristY>300 && rightWristY<=400){
            document.getElementById("Speed").innerHTML= "Speed- 2x";
            song.rate(2);
        }
        else if(rightWristY>400 && rightWristY<=500){
            document.getElementById("Speed").innerHTML= "Speed- 2.5x";
            song.rate(2.5);
        }
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function stop(){
    song.stop();
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);

        score_left_wrist= results[0].pose.keypoints[9].score;
        score_right_wrist= results[0].pose.keypoints[10].score;
        console.log("Right wrist score- "+score_right_wrist);
        console.log("Left wrist score- "+score_left_wrist);

        leftWristX= results[0].pose.leftWrist.x;
        leftWristY= results[0].pose.leftWrist.y;
        console.log("Left Wrist X- "+ leftWristX+" Left Wrist Y- "+leftWristY);

        rightWristX= results[0].pose.rightWrist.x;
        rightWristY= results[0].pose.rightWrist.y;
        console.log("Right wrist x- "+ rightWristX + " Right wrist y- "+ rightWristY);
    }
}
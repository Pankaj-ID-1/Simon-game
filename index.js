var buttoncolor = ["red" , "blue" , "green" , "yellow"];
var gamepattern = [];
var userclickedpattern = [];
var started = false;
var level = 1;
$(document).keypress(function(){
    if(!started){
        started = true;
        $("#level-title").text("Level "+level);
        nextsequence();
    }
});

function nextsequence(){
    userclickedpattern = [];
    $("#level-title").text("Level " + level);
    level++;
    var randomnumber = Math.floor(Math.random()*4);
    var randomcolor = buttoncolor[randomnumber];
    gamepattern.push(randomcolor);
    $("#"+randomcolor).fadeOut(100).fadeIn(100);
    playSound(randomcolor);
}
function playSound(char){
    var audio = new Audio("sounds/"+char+".mp3");
    audio.play();
}
$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userclickedpattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userclickedpattern.length-1);
    
});
function animatePress(char){
    $("#"+char).addClass("pressed");
    setTimeout(function(){
        $("#"+char).removeClass("pressed");
    },100);
}
function checkAnswer(num){
    if(gamepattern[num]===userclickedpattern[num]){
        if(userclickedpattern.length === gamepattern.length){
            setTimeout(function(){
                nextsequence();
            } , 1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key To Restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
    
}
function startOver(){
    gamepattern = [];
    started = 0;
    level = 1                               ;
}
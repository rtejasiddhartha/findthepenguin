$(document).ready( function() {
var c = 0;
var h = 0;
var rightClick = 0;
var n;
    
//This code will run after your page loads
$("#score").html('Score : '+c+'<br> High Score : '+h);
    //This code will run after your page loads

createGame();
createMound();    
//Shuffling Random Images//
RandomImage();    
    
$(".FindThePenguin").on('click', function (event) {
/*$("<audio></audio>").attr({
'src': 'media/Penguinpop.wav',
'volume': 1,
'autoplay': 'autoplay'
}).appendTo("body");*/
setGame($(this));
});
    
function createGame() {

  $("#message").css("visibility","hidden");
  $("#title").on("click", function() {
    $(this).fadeOut(1000, createMound());
  });
  // or on keypress
  $("body").on("keypress", function(event) {
    if (event.which === 13) {
      $("#title").fadeOut(1000, createMound());
    }
  });
}

function createMound() {

  // Add ice mounds to the game
  mound = $(".FindThePenguin");
  // Add mound hover effect
  mound.on("mouseenter", function() {
    $(this).addClass("moundHover");
  });
  mound.on("mouseleave", function() {
    $(this).removeClass("moundHover");
  });
}   
//Updating Score//
function setGame(penguin) {    
rightClick++;
//console.log(rightClick); 
penguin.css("pointer-events","none");    
var num = penguin.attr('id');
var Char = num.substr(num.length - 1);
if (penguin.hasClass("FindThePenguin yetti"))
{
$("<audio></audio>").attr({
'src': 'media/Yetipop.wav',
'volume': 1,
'autoplay': 'autoplay'
}).appendTo("body");
      //alert("Game Over. Want to Play Next Game Click Ok.");     
penguin.css('background-image', 'url(images/yeti.png)');
$("#score").html('Score: '+c+'<br> High Score : '+ h);

  penguin.on("mouseleave", function() {
    $(this).removeClass("yetti"); 
  });   
   
endGame(0); 
}
else
{
$("<audio></audio>").attr({
'src': 'media/Penguinpop.wav',
'volume': 1,
'autoplay': 'autoplay'
}).appendTo("body");    
c = c + 10;               
if(Char=='9')
    {
      //console.log(n.toString());    
      penguin.css('background-image', 'url(images/penguin_' + n.toString() + '.png)');   
    }
else{
    penguin.css('background-image', 'url(images/penguin_' + Char + '.png)'); 
}    
$("#score").html('Score : '+c+'<br> High Score : '+h);
   if(rightClick == 8)
       {
           endGame(1);
       }
}
}
    
function endGame(winValue) {
            if(c>h)
            {
                h=c;
        $("#score").html('Your Score : '+c+'<br> High Score : '+h);
                //console.log("Score : "+c+" Highscore : "+h);
            }
  // fade rest of the game
  $("#gameholder").fadeOut(3000, function() {
      $("#message").css("visibility","hidden");
    if (winValue) {    
      $("#message").text("Congratulation, You Win !!! \n Click here to play again");
    } else { 
      //alert("Yaaaarrrr ! Its Yetiii");    
      $("#message").text("Yeti Ate You!!! \n Click here to play again");
    }
      
    $("#message").css("visibility","visible"); 
    $("#message").css("display", "inline-block");
    $("#message").on("click", function() {
      reset();
    });
    $("body").on("keypress", function(event) {
      if (event.which === 13) {
        reset();
      }
    });
          
  });
      
}    

function reset() {
    c=0;
    rightClick = 0;
    $("#score").html('Your Score : '+c+'<br> High Score : '+h);
    //console.log("Score : "+c+" Highscore : "+h);    
  //make message disappear
  $("#message").css("display", "none");
  // create ice mounds again
  createMound();
  //make gameholder display again
  $("#gameholder").css("display", "block");
  $(".FindThePenguin").removeClass("yetti");    
  $(".FindThePenguin").removeAttr("style");
  $(".FindThePenguin").css("visibility", "visible");    
  // enable play game once more
  createGame();

          $( "div[id*='yeti']" ).attr('id','penguin'+n);

  RandomImage();    
}
        
function RandomImage() {

n = Math.floor((Math.random() * 9)+1);
//console.log("randon number : "+n);
$("#penguin" + n).addClass('yetti');
$("#penguin" + n).attr('id', 'yeti');
$('#penguin9').css('background-image', 'url(images/mound_' + n.toString() + '.png)');
}
});
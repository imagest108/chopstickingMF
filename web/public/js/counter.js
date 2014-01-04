$(window).on("load", setup);

var currentStatus = "";
var pastStatus = "";

var countdown;
var countdown_number;
var isDone;

var P1scoreS;
var P2scoreS;
var P1scoreC;
var P2scoreC;


var beep = "<audio autoplay><source src = '/audio/beepy-kick.m4a' type= 'audio/wav'></audio>";
var song = "<audio autoplay><source src = '/audio/beepy-kick.m4a' type= 'audio/wav'></audio>";


// spacebrew stuff ---------------------------------------------

var sb 
		,app_name = "chosticking";

function setup (){

			
		    // setup spacebrew!
		    var server = "localhost";
		    var name = "chosticking";
		    var description = "";

		    sb = new Spacebrew.Client(server, name, description);
			
		    // Override Spacebrew events - this is how you catch events coming from Spacebrew
		    sb.addPublish("command2pro","string");
			sb.addSubscribe("commandfrompro","string");
			sb.addSubscribe("P1scoreS","string");
			sb.addSubscribe("P2scoreS","string");
			sb.addSubscribe("P1scoreC","string");
			sb.addSubscribe("P2scoreC","string");


			sb.onStringMessage = onStringMessage;

		    sb.connect();
		  }	

//countdown function-------------------------------------------

function countdown_init() {

    countdown_number = 31;
    countdown_trigger();
    isDone = false;

}

function countdown_trigger() {
 
    if(countdown_number > 0) {
        countdown_number--;
        changeHTML("GO!! "+ countdown_number);
        
            countdown = setTimeout('countdown_trigger()', 1000);
            //console.log(countdown_number);
        
    }else if(countdown_number == 0){

    	console.log("I'm done!");
    	sb.send("command2pro","string","done");
    	
    }

    //console.log("counter: "+ countdown_number);

}

function countdown_clear() {

    clearTimeout(countdown);

}

//countdown function-------------------------------------------


function scoreCheck(P1scoreS, P2scoreS, P1scoreC, P2scoreC){

		console.log(P1scoreS+", "+P2scoreS+", "+P1scoreC+", "+P2scoreC);

		var result = "";
		if(+P1scoreS > +P2scoreS && +P1scoreC > +P2scoreC){
			result = "Player1 wins!!!";
		}else if(+P1scoreS < +P2scoreS && +P1scoreC < +P2scoreC){
			result = "Player2 wins!!!";
		}else if(+P1scoreS >= +P2scoreS && +P1scoreC <= +P2scoreC){
			result = "Nice work!!!";
		}else if(+P1scoreS <= +P2scoreS && +P1scoreC >= +P2scoreC){
			result = "Nice work!!!";
		}else{
			result = "Good job!";
		}

		$("h1").text(result);
		$("h3").text("player1 : "+P1scoreS+" sushis / "+P1scoreC+" points");
		$("h4").text("player2 : "+P2scoreS+" sushis / "+P2scoreC+" points");
	
		P1scoreS = "";
		P2scoreS = "";
 		P1scoreC = "";
		P2scoreC = "";
}
	
function playAudio(audioHTML){

	$("audio").html(audioHTML);
}

function changeHTML(text){
	
	$("h1").text(text);
	$("h3").text("");	

}

//spacebrew stuff -----------------------------------------------------

function onStringMessage(name, value){

	if(name == "commandfrompro"){

			pastStatus = currentStatus;
			currentStatus = value;

			if(currentStatus == "NEWGAME"){

				window.location("http://localhost:8000/play");
				console.log("current status is changed : " + currentStatus);
			
			}else if(currentStatus != pastStatus){
				
				console.log("current status is changed : " + currentStatus);
				changeHTML(currentStatus);
				playAudio(beep);
		
			} 
		
			if(currentStatus == "Go!!!!!!"){

				countdown_init();
				
			}else{

				countdown_clear();
			
			}
			
		
		}else if(name == "P1scoreS"){

			console.log("player1 : "+ value);
			P1scoreS = value;
		
		}else if(name == "P2scoreS"){

			console.log("player2 : "+value);
			P2scoreS = value;

		}else if(name == "P1scoreC"){

			console.log("player1 : "+ value);
			P1scoreC = value;
		
		}else if(name == "P2scoreC"){

			console.log("player2 : "+value);
			P2scoreC = value;
		}

		if(P1scoreS != null && P2scoreS != null && P1scoreC != null && P2scoreC != null){
			//console.log("score : "+scoreA +' , '+ scoreB);
			scoreCheck(P1scoreS, P2scoreS, P1scoreC, P2scoreC);

		}
	
}

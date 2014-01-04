/*
var Spacebrew = require('../sb-1.2.0');

var server = "localhost";
var name = "Chopsticking-js";
var description = " ";
var sb = new Spacebrew.Spacebrew.Client( server, name, description);

sb.addPublish("command2pro","string");
sb.addSubscribe("commandfrompro","string");


sb.onStringMessage = onStringMessage;
sb.onBooleanMessage = onBooleanMessage;

sb.connect();

var currentStatus = "";
var previousStatus = "";

function onStringMessage(name, value){

	if(name == "commandfrompro"){

		previousStatus = currentStatus;
		currentStatus = value;

		console.log(value);
	}

}

//if previousStatus != currentStatus ==> res.redirect to '/play' page 

function onBooleanMessage(name, value){

}
*/

exports.index = function(req, res) {
	
	console.log("main page requested");

		var templateData = {
			pageTitle : "Chopsticking"
		};

		res.render('index.html', templateData);
	
}

exports.learn = function(req, res) {
	
	console.log("learn page requested");

		var templateData = {
			pageTitle : "Chopsticking"
		}

		res.render('learn.html', templateData);
	
}

exports.play = function(req, res) {
	
	console.log("play page requested");

		var templateData = {
			pageTitle : "Chopsticking"
		}

	

	res.render('play.html', templateData);
	
}

exports.scorecheck = function(req, res){

	console.log("I'm ready!!");
	//sb.send("ready","boolean",true);

	var templateData = {
			pageTitle : "Chopsticking"
		}

	res.render('play.html', templateData);
}


exports.about = function(req, res) {
	
	console.log("find page requested");

		var templateData = {
			pageTitle : "Chopsticking"
		}

		res.render('about.html', templateData);
	
}

exports.contact = function(req, res) {
	
	console.log("find page requested");

		var templateData = {
			pageTitle : "Chopsticking"
		}

		res.render('contact.html', templateData);
	
}

exports.press = function(req, res) {
	
	console.log("find page requested");

		var templateData = {
			pageTitle : "Chopsticking"
		}

		res.render('press.html', templateData);
	
}

exports.photo = function(req, res) {
	
	console.log("find page requested");

		var templateData = {
			pageTitle : "Chopsticking"
		}

		res.render('photo.html', templateData);
	
}
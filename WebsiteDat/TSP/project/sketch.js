var cities = [];
var path = [];
var circleRad=10;
var noOfCities = 13;
var population,currentBest;
var count = 0;

function setup(){
	createCanvas(500,500);
	background(255);
	generateCityLocations();
	drawEllipsesAndPaths();
	var popMax = 20;
	var mutRate = 0.05;
	population = new Population(popMax,mutRate,cities);
}

function draw(){
	var currentBestTemp = currentBest;
	var genMaxFit = population.maxFitness();
	if(currentBest == null){
		currentBest = genMaxFit;
	}else{
		if(currentBest.fitness<genMaxFit.fitness){
			currentBest = genMaxFit;
		}
	}
	drawEllipsesAndPaths();
	text("Generation: "+population.generation+"   |", 250,500);
	text("Maximum Fitness: "+floor(currentBest.realFitness()), 350, 500);
	population.naturalSelection();
	population.generateNewPop();
}

function drawEllipsesAndPaths(){
	background(255);
	for(var i=0;i<cities.length;i++){
		ellipse(cities[i].x,cities[i].y,(circleRad*2),(circleRad*2));
	}
	if(currentBest!=null){
		//console.log(currentBest.path);
		for(var j=0;j<currentBest.path.length-1;j++){
			line(cities[currentBest.path[j]].x,cities[currentBest.path[j]].y,cities[currentBest.path[j+1]].x,cities[currentBest.path[j+1]].y);
		}
	}
}

function generateCityLocations(){
	for(var i=0;i<noOfCities;i++){
		cities.push(createVector(random(10,width-10),random(10,500-10)));
	}
}
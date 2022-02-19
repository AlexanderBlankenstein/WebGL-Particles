
// some variables used in the demo, these can be removed
var frameCount = 0;  // number of frames drawn
var drawState = 1;   // flag the controls which object drawn
var ht = 0.1;        // initial height of object, changed by keyboard input
var step = 0;
var particalList = [];
var yOff = 0.1;
var verticesArray = new Array();

//var reinitalizeSystem = ?;
var numberParticles = 1;
var directionOffset = 0.05;
var maximumAge = 10;
var ageVariation = 0;
var repeating = true;
var path = false;
var colour = "red"; //added in part 2. see readme for details. 

//Particle object. 
function Particle(x, y, z, xOff, zOff, curAge, maxAge) {
	this.position = [x,y,z];
	this.offsets = [xOff,yOff,zOff];
	this.currentAge = curAge;
	this.maxAge = maxAge;
}

//when r is pressed, reset everything so system starts fress. 
function resetSystem() {
	verticesArray = new Array();
	particalList = [];
	numberParticles = 1;
	directionOffset = 0.05;
	maximumAge = 10;
	ageVariation = 0;
	repeating = true;
	path = false;
	colour = "red"
}

//create a list of particles based off random settings within global ranges. 
//inputs number of particles requested, 
//returns list of particles (array).
function makeParticles(num) {
	var particles = new Array(num);
	for (let i=0; i<num; i++) {
		let x = Math.random() * (-2 - 2) + 2;
		let y = -1.0;
		let z = Math.random() * (-2 - 2) + 2;
		let xOff = Math.random() * (-directionOffset - directionOffset) + directionOffset;
		let zOff = Math.random() * (-directionOffset - directionOffset) + directionOffset;
		let curAge = 0;
		let maxAge = maximumAge + (Math.floor(Math.random() * (ageVariation + 1)));
		
		particles[i] = new Particle(x,y,z,xOff,zOff,curAge,maxAge);
	}
	return particles;
}

//reset particle with new randomized values.
function resetParticle(Particle) {
	let x = Math.random() * (-2 - 2) + 2;
	let y = -1.0;
	let z = Math.random() * (-2 - 2) + 2;
	let xOff = Math.random() * (-directionOffset - directionOffset) + directionOffset;
	let zOff = Math.random() * (-directionOffset - directionOffset) + directionOffset;
	let maxAge = maximumAge + (Math.floor(Math.random() * (ageVariation + 1)));
	
	Particle.position = [x,y,z];
	Particle.offsets = [xOff,yOff,zOff];
	Particle.currentAge = 0;
	Particle.maxAge = maxAge;
}

//age the particle and move it based off of its' offsets
function ageParticle(Particle) {
	Particle.currentAge += 1;
	let newX = Particle.position[0] + Particle.offsets[0];
	let newY = Particle.position[1] + Particle.offsets[1];
	let newZ = Particle.position[2] + Particle.offsets[2];
	
	//check if particle has aged or moved outside its' boundary
	if (Particle.currentAge > Particle.maxAge || newX < -2.0 || newX > 2.0 || newY > 2.0 || newZ < -2.0 || newZ > 2.0) {
		if (repeating) {
			resetParticle(Particle);
		}
	} else {
		Particle.position = [newX,newY,newZ];
	}
}

	// return the number of vertices in the object
function getVertexCount() {
	return [(verticesArray.length/18)*6];
}

	// vertex positions
function loadvertices() {
	//add particles if numberParticles changes
	if (numberParticles != particalList.length) {
		particalList = makeParticles(numberParticles);
	}

	// every 25 frames causes the object being drawn to move
	if (frameCount % 25 == 0) {
		//drawState *= -1;
		step += 1;
		for (let i=0; i<particalList.length; i++) {
			ageParticle(particalList[i]);
		}
	}
	
	//if path is on then keep old array with all previous vertices
	if (!path) {
		verticesArray = new Array();
	}
	
	for (let i=0; i<particalList.length; i++) {
		var x = particalList[i].position[0];
		var y = particalList[i].position[1];
		var z = particalList[i].position[2];
		verticesArray.push(	
			x, (y-0.1), z,
			x, y,  z,
			x, (y-0.1), (z-0.1),
		
			x, (y-0.1), (z-0.1),
			x, y,  z,
			x, y, (z-0.1),
		);
	}
	//console.log("VR: " + verticesArray.length);
	return verticesArray;

	//Old code. used as reference
	
	// use drawState to alternate between the objects (high and low objects)
	// you will need to add more complex state control for the assignment
	// all of the other loading function below do the same thing
	//if (drawState == 1) {
	//	return [
	//		-2.0, -ht, -2.0,
	//		-2.0, 0.0,  -2.0,
	//		-2.0, -ht, -2.1,

	//		-2.0, -ht, -2.1,
	//		-2.0, 0.0,  -2.0,
	//		-2.0, 0.0, -2.1,

	//		2.0, -ht,  2.0,
	//		2.0, 0.0,   2.0,
	//		2.0, -ht, 2.1,

	//		2.0, -ht, 2.1,
	//		2.0, 0.0,   2.0,
	//		2.0, 0.0,  2.1,
	//	];
	//} else {
	//	return [
	//		-2.0, 0.0, -2.0,
	//		-2.0, ht,  -2.0,
	//		-2.0, 0.0, -2.1,

	//		-2.0, 0.0, -2.1,
	//		-2.0, ht,  -2.0,
	//		-2.0, ht, -2.1,

	//		2.0, 0.0,  2.0,
	//		2.0, ht,   2.0,
	//		2.0, 0.0,  2.1,

	//		2.0, 0.0,  2.1,
	//		2.0, ht,   2.0,
	//		2.0, ht,  2.1,
	//	];
	//}
}


	// normals array
	// all triangles face in the same direction so the normals are
	//   all the same 
function loadnormals() {
	let normalArray = [];
	for (let i=0; i<(verticesArray.length/18); i++) {
		normalArray.push(
		0.0, 0.0,  1.0,
		0.0, 0.0,  1.0,
		0.0, 0.0,  1.0,
		0.0, 0.0,  1.0,
		0.0, 0.0,  1.0,
		0.0, 0.0,  1.0,);
	}
	//console.log("NO: " + normalArray.length);
	return normalArray;
	
	//Old code. used as reference
	
	/*
	if (drawState == 1) {
		return [
			0.0, 0.0,  1.0,
			0.0, 0.0,  1.0,
			0.0, 0.0,  1.0,
			0.0, 0.0,  1.0,
			0.0, 0.0,  1.0,
			0.0, 0.0,  1.0,
			0.0, 0.0,  1.0,
			0.0, 0.0,  1.0,
			0.0, 0.0,  1.0,
			0.0, 0.0,  1.0,
			0.0, 0.0,  1.0,
			0.0, 0.0,  1.0,
		];
	} else {
		return [
			0.0, 1.0,  1.0,
			0.0, 1.0,  1.0,
			0.0, 1.0,  1.0,
			0.0, 1.0,  1.0,
			0.0, 1.0,  1.0,
			0.0, 1.0,  1.0,
			0.0, 0.0,  1.0,
			0.0, 0.0,  1.0,
			0.0, 0.0,  1.0,
			0.0, 0.0,  1.0,
			0.0, 0.0,  1.0,
			0.0, 0.0,  1.0,
		];
	}
	*/
}

	//Note: you can change colour by keypress "c"
	
	// 1.0,  0.0,  0.0,  1.0,    // red
	// 0.0,  1.0,  0.0,  1.0,    // green
	// 0.0,  0.0,  1.0,  1.0,    // blue
	// 1.0,  1.0,  1.0,  1.0,    // white
	// colors for the verticies
function loadcolors() {
	let colorsArray = [];
	
	if (colour == "red") {
		for (let i=0; i<(verticesArray.length/18); i++) {
			colorsArray.push(
				1.0,  0.0,  0.0,  1.0,
				1.0,  0.0,  0.0,  1.0,
				1.0,  0.0,  0.0,  1.0,
				1.0,  0.0,  0.0,  1.0,
				1.0,  0.0,  0.0,  1.0,
				1.0,  0.0,  0.0,  1.0,);
		}
	} else if (colour == "green") {
		for (let i=0; i<(verticesArray.length/18); i++) {
			colorsArray.push(
				0.0,  1.0,  0.0,  1.0,
				0.0,  1.0,  0.0,  1.0,
				0.0,  1.0,  0.0,  1.0,
				0.0,  1.0,  0.0,  1.0,
				0.0,  1.0,  0.0,  1.0,
				0.0,  1.0,  0.0,  1.0,);
		}
	} else if (colour == "blue") {
		for (let i=0; i<(verticesArray.length/18); i++) {
			colorsArray.push(
				0.0,  0.0,  1.0,  1.0,
				0.0,  0.0,  1.0,  1.0,
				0.0,  0.0,  1.0,  1.0,
				0.0,  0.0,  1.0,  1.0,
				0.0,  0.0,  1.0,  1.0,
				0.0,  0.0,  1.0,  1.0,);
		}
	} else if (colour == "magenta") {
		for (let i=0; i<(verticesArray.length/18); i++) {
			colorsArray.push(
				1.0,  0.0,  1.0,  0.0,
				1.0,  0.0,  1.0,  0.0,
				1.0,  0.0,  1.0,  0.0,
				1.0,  0.0,  1.0,  0.0,
				1.0,  0.0,  1.0,  0.0,
				1.0,  0.0,  1.0,  0.0,);
		}
	} else { //colour is white then
		for (let i=0; i<(verticesArray.length/18); i++) {
			colorsArray.push(
				1.0,  1.0,  1.0,  1.0,
				1.0,  1.0,  1.0,  1.0,
				1.0,  1.0,  1.0,  1.0,
				1.0,  1.0,  1.0,  1.0,
				1.0,  1.0,  1.0,  1.0,
				1.0,  1.0,  1.0,  1.0,);
		}
	}
	return colorsArray;
}

	// load vertex indices
function loadvertexindices() {
	let vertexindicesArray = [];
	for (let i=0; i<(verticesArray.length/18)*6; i++) {
		vertexindicesArray.push(i);
	}
	//console.log("VI: " + vertexindicesArray.length);
	return vertexindicesArray;
	
	//Old code. used as reference
	
	/*
	if (drawState == 1) {
		return [
			0,1,2,  3,4,5, 6,7,8, 9,10,11
		];
	} else {
		return [
			0,1,2,  3,4,5, 6,7,8, 9,10,11
		];
	}
	*/
}


	// texture array size and data
function loadwidth() {
	return 2;
}

function loadheight() {
	return 2;
}

function loadtexture() {
	return( 
		new Uint8Array(
			[50,100,50,255,
            100,150,100,255,
            150,200,150,255,
            200,250,200,255]
		) 
	);
}

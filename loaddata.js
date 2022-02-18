
// some variables used in the demo, these can be removed
var frameCount = 0;  // number of frames drawn
var drawState = 1;   // flag the controls which object drawn
var ht = 0.1;        // initial height of object, changed by keyboard input
var step = 0;
var particalList = [];
var yOff = 0.1;

//let numVertices = numNormals;
//let numIndices = numVertices/3;
//let numTextureCoords = numVertices*(2/3);

//var reinitalizeSystem = ?;
var numberParticles = 1;
var directionOffset = 0.05;
var maximumAge = 10;
var ageVariation = 0;
var repeating = true;
var path = true;

var verticesArray = new Array();

//Particle object. 
function Particle(x, y, z, xOff, zOff, curAge, maxAge) {
	this.position = [x,y,z];
	this.offsets = [xOff,yOff,zOff];
	this.currentAge = curAge;
	this.maxAge = maxAge;
	//this.positionPath = new Array();
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
		//let positionPath = new Array();
		
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
	//Particle.positionPath = new Array();
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
		/*
		if (path) {
			Particle.positionPath.push(newX,newY,newZ,);
		} else {
			Particle.positionPath = [newX,newY,newZ];
		}
		*/
		//if (!path) {
		//	Particle.positionPath = new Array();
		//}
		//Particle.positionPath.push(newX,newY,newZ,);
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
	
	if (!path) {
		verticesArray = new Array();
	}
	//verticesArray = new Array();
	
	/*
	for (let i=0; i<particalList.length; i++) {
		for (let j=0; j<(particalList[i].positionPath.length/3); j++) {
			var x = particalList[i].positionPath[i*3+0];
			var y = particalList[i].positionPath[i*3+1];
			var z = particalList[i].positionPath[i*3+2];
			verticesArray.push(	
				x, (y-0.1), z,
				x, y,  z,
				x, (y-0.1), (z-0.1),
		
				x, (y-0.1), (z-0.1),
				x, y,  z,
				x, y, (z-0.1),
			);
		}
	}
	*/
	
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


	// texture coordinates
	// the current texture support four colours
	// 0.0 to 0.5, 0.0 to 0.5   colour 1
	// 0.0 to 0.5, 0.5 to 1.0   colour 2
	// 0.5 to 1.0, 0.0 to 0.5   colour 3
	// 0.5 to 1.0, 0.5 to 1.0   colour 4
function loadtextcoords() {
	let textCoordsArray = [];
	for (let i=0; i<(verticesArray.length/18); i++) {
		textCoordsArray.push(
		0.5,  0.5,
		1.0,  0.5,
		1.0,  1.0,
		0.5,  0.5,
		1.0,  0.5,
		1.0,  1.0,);
	}
	//console.log("TC: " + textCoordsArray.length);
	return textCoordsArray;
	/*
	if (drawState == 1) {
		return  [
			0.5,  0.5,
			1.0,  0.5,
			1.0,  1.0,
			0.5,  0.5,
			1.0,  0.5,
			1.0,  1.0,
			0.5,  0.5,
			1.0,  0.5,
			1.0,  1.0,
			0.5,  0.5,
			1.0,  0.5,
			1.0,  1.0,
		];
	} else {
		return  [
			0.0,  0.0,
			0.5,  0.0,
			0.5,  0.5,
			0.0,  0.0,
			0.5,  0.0,
			0.5,  0.5,
			0.0,  0.0,
			0.5,  0.0,
			0.5,  0.5,
			0.0,  0.0,
			0.5,  0.0,
			0.5,  0.5,
		];
	}
	*/
}


	// load vertex indices
function loadvertexindices() {
	let vertexindicesArray = [];
	for (let i=0; i<(verticesArray.length/18)*6; i++) {
		vertexindicesArray.push(i);
	}
	//console.log("VI: " + vertexindicesArray.length);
	return vertexindicesArray;
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

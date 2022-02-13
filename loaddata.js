
// some variables used in the demo, these can be removed
var frameCount = 0;  // number of frames drawn
var drawState = 1;   // flag the controls which object drawn
var ht = 0.1;        // initial height of object, changed by keyboard input

//var reinitalizeSystem = ?;
var numberParticles = 1;
var directionOffset = 0.05;
var maximumAge = 10;
var ageVariation = 0;
var repeating = true;
var path = true;


function Particle(x, y, z, xOff, zOff, curAge, maxAge) {
	this.position = (x,y,z);
	this.offsets = (xOff,0.1,zOff);
	this.currentAge = curAge;
	this.maxAge = maxAge;
}

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

function resetParticle(Particle) {
	let x = Math.random() * (-2 - 2) + 2;
	let y = -1.0;
	let z = Math.random() * (-2 - 2) + 2;
	let xOff = Math.random() * (-directionOffset - directionOffset) + directionOffset;
	let zOff = Math.random() * (-directionOffset - directionOffset) + directionOffset;
	let maxAge = maximumAge + (Math.floor(Math.random() * (ageVariation + 1)));
	
	Particle.position = (x,y,z);
	Particle.offsets = (xOff,0.1,zOff);
	Particle.currentAge = 0;
	Particle.maxAge = maxAge;
}


	// return the number of vertices in the object
function getVertexCount() {
      return [12];
}

	// vertex positions
function loadvertices() {

	// every 25 frames causes the object being drawn to change to other
	// object
	// this can be removed for the assignment
	if (frameCount % 25 == 0) {
		drawState *= -1;
	}

	// use drawState to alternate between the objects (high and low objects)
	// you will need to add more complex state control for the assignment
	// all of the other loading function below do the same thing
	if (drawState == 1) {
		return [
			-2.0, -ht, -2.0,
			-2.0, 0.0,  -2.0,
			-2.0, -ht, -2.1,

			-2.0, -ht, -2.1,
			-2.0, 0.0,  -2.0,
			-2.0, 0.0, -2.1,

			2.0, -ht,  2.0,
			2.0, 0.0,   2.0,
			2.0, -ht, 2.1,

			2.0, -ht, 2.1,
			2.0, 0.0,   2.0,
			2.0, 0.0,  2.1,
		];
	} else {
		return [
			-2.0, 0.0, -2.0,
			-2.0, ht,  -2.0,
			-2.0, 0.0, -2.1,

			-2.0, 0.0, -2.1,
			-2.0, ht,  -2.0,
			-2.0, ht, -2.1,

			2.0, 0.0,  2.0,
			2.0, ht,   2.0,
			2.0, 0.0,  2.1,

			2.0, 0.0,  2.1,
			2.0, ht,   2.0,
			2.0, ht,  2.1,
		];
	}
}


	// normals array
	// all triangles face in the same direction so the normals are
	//   all the same 
function loadnormals() {
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
}


	// texture coordinates
	// the current texture support four colours
	// 0.0 to 0.5, 0.0 to 0.5   colour 1
	// 0.0 to 0.5, 0.5 to 1.0   colour 2
	// 0.5 to 1.0, 0.0 to 0.5   colour 3
	// 0.5 to 1.0, 0.5 to 1.0   colour 4
function loadtextcoords() {
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
}


	// load vertex indices
function loadvertexindices() {
	if (drawState == 1) {
		return [
			0,1,2,  3,4,5, 6,7,8, 9,10,11
		];
	} else {
		return [
			0,1,2,  3,4,5, 6,7,8, 9,10,11
		];
	}
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


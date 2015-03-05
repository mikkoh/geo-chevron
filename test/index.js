var shell = require('gl-now')( {

	clearColor: [ 1, 1, 1, 1 ]
});
var simple3DShader = require('simple-3d-shader');
var createGeometry = require('gl-geometry');
var meshCombine = require('mesh-combine');
var mat4 = require('gl-matrix').mat4;
var geoChevron = require('./..');

var rotation = 0;
var cellSize = 2;
var gl, geo, shader, model, projection, drawWith;


shell.on( 'gl-init', function() {

	var allGeo = [];

	gl = shell.gl;

	switch( cellSize ) {

		case 1:
			drawWith = gl.POINTS;
		break;

		case 2:
			drawWith = gl.LINES;
		break;

		case 3:
			drawWith = gl.TRIANGLES;
		break;
	}
	
	allGeo.push(geoChevron( {
		cellSize: cellSize,
		width: 230,
		depth: 300,
		thickness: 40
	}));

	allGeo.push(geoChevron( {
		cellSize: cellSize,
		y: 130
	}));

	allGeo.push(geoChevron( {
		cellSize: cellSize,
		y: -130,
		width: 300,
		depth: 100,
		thickness: 80
	}));


	geo = meshCombine( allGeo );

	shader = simple3DShader( gl );

	mesh = createGeometry( gl )
	.attr( 'positions', geo.positions )
	.faces( geo.cells, { size: cellSize } );
});

shell.on( 'gl-render', function() {

	projection = mat4.create();
	mat4.perspective( projection, Math.PI * 0.25, shell.width / shell.height, 0.1, 10000 );

	model = mat4.create();
	mat4.translate( model, model, [ 0, 0, -1000 ] );
	mat4.rotateX( model, model, Math.PI * 0.1 );
	mat4.rotateY( model, model, rotation += 0.005 );

	shader.bind();

	shader.uniforms.projection = projection;
	shader.uniforms.model = model;
	shader.uniforms.view = mat4.create();

	shader.attributes.color = [ 0, 0, 0 ];

	mesh.bind( shader );
	mesh.draw( drawWith );
	mesh.unbind();
});

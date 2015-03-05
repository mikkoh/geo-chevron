module.exports = geoChevron;

function geoChevron( options ) {

  var geo = {
    positions: [],
    cells: []
  };

  options = options || {};
  options.cellSize = options.cellSize || 3;
  options.x = options.x || 0;
  options.y = options.y || 0;
  options.z = options.z || 0;
  options.width = options.width || 100;
  options.depth = options.depth || 50;
  options.thickness = options.thickness || 20;

  createGeometry( options, geo.positions, geo.cells );

  return geo;
}

function createGeometry( options, positions, cells ) {

  var o = options;
  var halfWidth = o.width * 0.5;
  var halfDepth = o.depth * 0.5;
  var y = o.y;
  var tlX = -halfDepth + o.x;
  var tlZ = -halfWidth + o.z;
  var tliX = tlX + o.thickness + o.x; //inner
  var tliZ = tlZ + o.z; //inner
  var blX = tlX;
  var blZ = halfWidth;
  var bliX = tliX; //inner
  var bliZ = blZ; //inner
  var tipX = halfDepth;
  var tipZ = 0;
  var tipiX = halfDepth - o.thickness; //inner
  var tipiZ = 0; //inner
  var idxTL = 0;
  var idxTLI = 1;
  var idxTIPI = 2;
  var idxBLI = 3;
  var idxBL = 4;
  var idxTIP = 5;

  positions.push( [ tlX, y, tlZ ] );
  positions.push( [ tliX, y, tliZ ] );
  positions.push( [ tipiX, y, tipiZ ] );
  positions.push( [ bliX, y, bliZ ] );
  positions.push( [ blX, y, blZ ] );
  positions.push( [ tipX, y, tipZ ] );

  if( o.cellSize == 1 ) {

    cells.push( [ idxTL ],
                [ idxTLI ],
                [ idxTIPI ],
                [ idxBLI ],
                [ idxBL ],
                [ idxTIP ] );
  } else if( o.cellSize == 2 ) {

    cells.push( [ idxTL, idxTLI ],
                [ idxTLI, idxTIP ],
                [ idxTIP, idxBLI ],
                [ idxBLI, idxBL ],
                [ idxBL, idxTIPI ],
                [ idxTIPI, idxTL ] );
  } else if( o.cellSize == 3 ) {

    cells.push( [ idxTL, idxTLI, idxTIP ],
                [ idxTL, idxTIPI, idxTIP ],

                [ idxBL, idxBLI, idxTIP ],
                [ idxBL, idxTIPI, idxTIP ] );
  }
  
}
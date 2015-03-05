# geo-chevron

![render](./render.png)
[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

Creates a 2d chevron type shape in 3d space.

## Usage

[![NPM](https://nodei.co/npm/geo-chevron.png)](https://www.npmjs.com/package/geo-chevron)

### Example

An example can be found at `./test/index.js`. You can run this test by calling:
```
$ npm test
```

A simple usage example with default values being passed as settings:
```javascript
var geoChevron = require('geo-chevron');

// geo will be a Object will two properties:
// positions - the vertices
// cells - the indices to draw the chevron
var geo = geoChevron( {
    cellSize: 3, // 1 == points, 2 == lines, 3 == triangles
    x: 0, // x position of the center of the chevron
    y: 0, // y position of the center of the chevron
    z: 0 // z position of the center of the chevron
    width: 50, // how wide the chevron is
    depth: 100, // how far in depth the chevron goes
    thickness: 20 // how thick the chevron will be
});
```

## License

MIT, see [LICENSE.md](http://github.com/mikkoh/geo-chevron/blob/master/LICENSE.md) for details.

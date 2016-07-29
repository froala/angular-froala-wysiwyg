var Builder = require('systemjs-builder');

// optional constructor options
// sets the baseURL and loads the configuration file
var builder = new Builder('./', './systemjs.config.js');

builder.buildStatic('./src/main.js', './demo/app.js', { minify: true, sourceMaps: true });
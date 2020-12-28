const copy = require('copy-dir');

copy('dist-src', 'dist', { cover: true });

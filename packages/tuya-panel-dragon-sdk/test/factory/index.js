const babel = require('babel-register');
babel({
  presets: ['env'],
  plugins: [],
});

require('./factory');

#!/bin/bash
npm install webpack webpack-dev-server babel-loader babel-preset-es2015 babel-preset-react babel-core --save-dev
npm install react react-dom --save
echo '{ presets" : ["es2015", "react"] }' > .babelrc

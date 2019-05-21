//Install express server
const express = require('express');
const path = require('path');

const server = express();

// Serve only the static files form the dist directory
server.use(express.static('./dist/dsoweb'));

server.get('/*', function (req, res) {

  res.sendFile(path.join(__dirname, '/dist/dsoweb/index.html'));
});

// Start the app by listening on the default Heroku port
server.listen(process.env.PORT || 8080);
console.log("Running on port: 8080");

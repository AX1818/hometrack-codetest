'use strict';

const http = require('http');
const personStream = require('./person-stream');
const sendErrorResponse = require('./error-handler');
const validRequest = require('./validator');

const server = http.createServer((req, res) => {
  // only support 'POST'
  if (!validRequest(req)) {
    sendErrorResponse(res);
  } else {
    req.pipe(personStream(res));
  }
});

server.listen(process.env.PORT || 3000);

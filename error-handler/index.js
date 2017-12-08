'use strict';

function sendErrorResponse(res) {
  res.writeHead(400, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify({ "error": "Could not decode request: JSON parsing failed" }));
  res.end();
}

module.exports = sendErrorResponse;

'use strict';

function validRequest(request) {
  return request.method === 'POST';
}

module.exports = validRequest;
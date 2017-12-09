'use strict';

const JSONStream = require('JSONStream');

const sendErrorResponse = require('../error-handler');

function combineAddress(person) {
  if (!person || !person.address) {
    return '';
  }

  const { unitNumber, buildingNumber, street, suburb, state, postcode } = person.address;
  return [unitNumber, buildingNumber, street, suburb, state, postcode].filter((ap) => ap).join(' ');
}

function getPersonStream (res) {
  const stream = JSONStream.parse('payload');

  let validPayload = false;
  stream.on('data', (payload) => {
    // payload must be an array
    if (!payload || !Array.isArray(payload)) {
      return;
    }

    validPayload = true;
    const mps = payload.filter((person) => person.type === 'htv' && person.workflow === 'completed')
    .map((person) => {
      const {type, workflow} = person;
      return {concataddress: combineAddress(person), type, workflow};
    });

    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify({response: mps}));
    res.end();
  })
  .on('end', () => {
    if(!validPayload) {
      sendErrorResponse(res);
    }
  })
  .on('error', () => sendErrorResponse(res));

  return stream;
}

module.exports = getPersonStream;

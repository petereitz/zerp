// index.js
// blame pete

// ---SETUP---

// requests
const r = require('request');
// check urls
const vUrl = require('valid-url');



// ---FUNCTIONS---

// now
function getNow(){
  return Math.floor(Date.now() / 1000);
}



// ---BUSINESS---

// constructor
function Zerp(baseURL) {
  // we absolutely want a url to work with
  if ((baseURL) && vUrl.isWebUri(baseURL)) {
    this.baseURL = baseURL;
    return true;
  } else {
    // stop now cause this isn't going to work
    throw Error('zerp requires a URL to connect to!');
    return false;
  }
};


// post a message to the viewport
Zerp.prototype.send = function(message){
  return new Promise((resolve, reject)=>{
    // build url
    let url = `${this.baseURL}/event`;
    // our payload object
    let payload = {};
    // type and body are essential
    if (message.hasOwnProperty('type') && message.hasOwnProperty('body')){
        payload.type = message.type;
        payload.message = message.body;
    } else {
      throw Error('zerp.send() requires a type and body!');
    }
    // are we adding a ttl?
    if (message.hasOwnProperty('ttl')){
      payload.ttl = message.ttl;
    }

    // POST 'em
    r.post({url: url, json: payload}, function(err, res, body){
      if (err){
        console.err(`Failed to POST message to ${url}\nError: ${err}`);
        reject(err);
      }
      resolve({response: res, body: body});
    });
  });
}


module.exports = Zerp;

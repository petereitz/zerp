## Overview
Post fleeting messages to a zerp-viewport instance.

### Install
```
npm install zerp
```

### Usage
```
const zerp = require('zerp');
const z = new zerp('http://localhost:8000');

z.send({type: 'alert', ttl: 50, body: 'carl has brand new shoes!'});
```

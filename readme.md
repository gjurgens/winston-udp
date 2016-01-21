# winston-udp [![Build Status](https://travis-ci.org/gjurgens/winston-udp.svg?branch=master)](https://travis-ci.org/gjurgens/winston-udp)

A UDP transport for [winston][0].

## Installation

### Installing npm (node package manager)

``` sh
  $ curl http://npmjs.org/install.sh | sh
```

### Installing winston-udp

``` sh
  $ npm install winston
  $ npm install winston-udp
```

## Usage
``` js
  var winston = require('winston');

  //
  // Requiring `winston-udp` will expose
  // `winston.transports.UDP`
  //
  require('winston-udp').UDP;

  winston.add(winston.transports.UDP, options);
```

The UDP transport uses node's native [dgram](https://nodejs.org/api/dgram.html) behind the scenes.  Options are the following:

* __server:__ The address you want to send datagrams to. (default: `127.0.0.1`)
* __port:__ The port number you want to send datagrams to. (default: `9999`)
* __level:__ The minimum logging level that this transport will handle. (default: `info`)
* __formatter:__ The message formatter function. For more details, see [winston's repository](https://github.com/winstonjs/winston#custom-log-format).

## License
The MIT License (MIT)

Copyright (c) 2015 Gabriel Jürgens

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

[0]: https://github.com/flatiron/winston


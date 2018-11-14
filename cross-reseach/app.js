const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");

//CONST
const API = '/api/v1'

const port = 3000;
const app = express();

const clientPort_1000 = 1000;
const clientApp_1000 = express();

const clientPort_2000 = 2000;
const clientApp_2000 = express();

function draft() {
  // mongoose.connect(dbUri);
  // const db = mongoose.connection;
  // db.on("error", console.error.bind(console, "connection error:"));
  // db.once("open", function () {
  //   // we're connected!
  // });


  // app.get("/", (req, res) => {
  //   res.send("<h1>Hello World</h1>");
  //   throw new Error("Broken");
  // });

  // app.get('/', (req, res, next) => {
  //   Promise.resolve().then(() => {
  //     throw new Error("Broken");
  //   }).catch(next);
  // })


  // app.get('/', [
  //   (req, res, next) => {
  //     fs.readFile('/maybe-valid-file', 'utf8', (err, data) => {
  //       res.locals.data = data;
  //       next(err);
  //     })
  //   },
  //   (req, res) => {
  //     res.locals.data = res.locals.data.split(',')[1];
  //     res.send(res.locals.data);
  //   }
  // }
}

//Data
const Posts = {
  '1': {
    'post': 'This is the first blog post.'
  },
  '2': {
    'post': 'This is the second blog post.'
  },
  '3': {
    'post': 'This is the third blog post.'
  }
};

//Controller
class AppFactory {
  constructor(version) {
    this._version = version;
  }

  get version() {
    return this._version.toUpperCase();
  }
  set version(newVersion) {
    this._version = newVersion; // validation could be checked here such as only allowing non numerical values
  }

  initApp(app, port) {
    app.get(`/`, (req, res) => {
      res.sendFile(path.join(__dirname + '/login.html'))
    });
    app.get(`/page1`, (req, res) => {
      res.sendFile(path.join(__dirname + '/page1.html'))
    });
    app.get(`/client`, (req, res) => {
      res.sendFile(path.join(__dirname + '/client.html'))
    });
    app.listen(port, () => console.log(`Example app listening on port ${port}!`));
  }

  singletonActivated() {
    Object.freeze(this);
  }
}

function initSystem() {
  //init another apps
  const appFactory = new AppFactory();

  appFactory.initApp(app, port);
  appFactory.initApp(clientApp_1000, clientPort_1000);
  appFactory.initApp(clientApp_2000, clientPort_2000);
  appFactory.initApp(express(), 4000);
  appFactory.initApp(express(), 5000);
  appFactory.singletonActivated();

}

function initMethodsFor(appInstance) {
  //Main app Api setup
  appInstance.get(`${API}/posts`, (req, res) => {
    res.json(Posts)
  })
  appInstance.delete(`${API}/posts/:id`, (req, res) => {
    if (req.cookies['username'] === 'owner') {
      delete Posts[req.params.id];
      res.headers = ['Access-Control-Allow-Credentials', 'true']
      res.status(204).end();
    } else {
      res.status(403).end();
    }
  })
}

function addNewMiddlewareTo(appInstance) {
  appInstance.use(cookieParser());
  appInstance.use(express.static(__dirname))
  appInstance.use(handleCros(corsOptions));
}

//Set up cross-domain

const isPreflight = function (req) {
  const isHttpOptins = req.method === 'OPTIONS';
  const hasOriginHeader = req.headers['origin'];
  const hasRequestMethod = req.headers['access-control-request-method'];
  return isHttpOptins && hasOriginHeader && hasRequestMethod;
}

const originWhitelist = ['http://localhost:5000', 'http://localhost:1000', 'null'];

const corsOptions = {
  allowOrigin: (origin) => {
    return originWhitelist.includes(origin) ? origin : '';
  },
  allowCredentials: true,
  shortCircuit: true,
  allowMethods: ['GET', 'DELETE'],
  allowHeaders: (req) => {
    let reqHeaders = req.headers['access-control-request-headers'];
    if (!reqHeaders) {
      return null
    }
    reqHeaders = reqHeaders.split(',');
    resHeaders = [];
    reqHeaders.forEach(rh => {
      let header = rh.trim();
      if (header.toLowerCase().indexOf('x-') === 0) {
        resHeaders.push(header)
      }
      return resHeaders.join(',');
    })
  },

  maxAge: 120, //Maximizing the preflight cache
  exposeHeaders: ['X-Powered-By']
};

const isSameOrigin = (req) => {
  let host = req.protocol + '://' + req.headers['host'];
  let origin = req.headers['origin'];
  return host === origin || !origin;
}


const handleCros = (options) => {
  return (req, res, next) => {


    if (options.allowOrigin) {
      let origin = req.headers.origin;
      if ((options.allowOrigin(origin)).length) {
        res.set('Access-Control-Allow-Origin', options.allowOrigin(origin));
      } else if (options.shortCircuit) {
        res.status(403).end();
        return;
      }
      res.set('Vary', 'Origin');
    } else {
      res.set('Access-Control-Allow-Origin', '*');
    }

    res.set('Access-Control-Allow-Credentials', options.allowCredentials);

    if (isPreflight(req)) {

      if (options.allowMethods) {
        res.set('Access-Control-Allow-Methods', options.allowMethods.join(','))
      }

      if (typeof (options.allowHeaders) === 'function') {
        let headers = options.allowHeaders(req);
        res.set('Access-Control-Allow-Headers', headers)
      }

      if (options.maxAge) {
        res.set('Access-Control-Max-Age', options.maxAge)
      }
      res.status(204).end();
      return;
    } else {
      res.set('Access-Control-Expose-Headers', options.exposeHeaders.join(','));
    }
    next();
  }
}



initSystem();
initMethodsFor(app);
addNewMiddlewareTo(app);
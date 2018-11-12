const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const dbUri = "";


const API = '/api/v1'

const port = 3000;
const app = express();

const clientPort_1000 = 1000;
const clientApp_1000 = express();

const clientPort_2000 = 2000;
const clientApp_2000 = express();

function draft() { // mongoose.connect(dbUri);
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

  // appFactory.singletonActivated();
  appFactory.initApp(app, port);
  appFactory.initApp(clientApp_1000, clientPort_1000);
  appFactory.initApp(clientApp_2000, clientPort_2000);
  appFactory.initApp(express(), 4000);
  appFactory.initApp(express(), 5000);

  //Main app Api setup
  app.get(`${API}/posts`, (req, res) => {
    res.json(Posts)
  })

  app.delete(`${API}/posts/:id`, (req, res) => {
    delete Posts[req.params.id];
    res.status(204).end()
  })
}

//Set up cross-domain
const handleCros = (req, res, next) => {
  const acceptedClient = ['http://localhost:5000', 'http://localhost:2000', 'http://localhost:1000'];
  res.set('Access-Control-Allow-Origin', acceptedClient.includes(req.headers.origin) ? req.headers.origin : '');
  next();
}
app.use(handleCros);

initSystem();
.
├── app.js
├── bin
│ └── www
├── package.json
├── public
│ ├── images
│ ├── javascripts
│ └── stylesheets
│ └── style.css
├── routes
│ ├── index.js
│ └── users.js
└── views
├── error.pug
├── index.pug
└── layout.pug

## Build-in middle ware

express.static serves static assets such as HTML files, images, and so on.
express.json parses incoming requests with JSON payloads. NOTE: Available with Express 4.16.0+
express.urlencoded parses incoming requests with URL-encoded payloads. NOTE: Available with Express 4.16.0+

<ul>
<li><a href="#middleware.application" class="active">Application-level middleware</a></li>
<li><a href="#middleware.router" class="active">Router-level middleware</a></li>
<li><a href="#middleware.error-handling" class="active">Error-handling middleware</a></li>
<li><a href="#middleware.built-in" class="active">Built-in middleware</a></li>
<li><a href="#middleware.third-party" class="active">Third-party middleware</a></li>
</ul>


## Use Helmet

* Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.

*  Helmet is actually just a collection of nine smaller middleware functions that set security-related HTTP headers:

- csp sets the Content-Security-Policy header to help prevent cross-site scripting attacks and other cross-site injections.
- hidePoweredBy removes the X-Powered-By header.
- hpkp Adds Public Key Pinning headers to prevent man-in-the-middle attacks with forged certificates.
- hsts sets Strict-Transport-Security header that enforces secure (HTTP over SSL/TLS) connections to the server.
- ieNoOpen sets X-Download-Options for IE8+.
- noCache sets Cache-Control and Pragma headers to disable client-side caching.
- noSniff sets X-Content-Type-Options to prevent browsers from MIME-sniffing a response away from the declared content-type.
- frameguard sets the X-Frame-Options header to provide clickjacking protection.
- xssFilter sets X-XSS-Protection to enable the Cross-site scripting (XSS) filter in most recent web browsers.

## Use cookies securely
Set the following cookie options to enhance security:

- secure - Ensures the browser only sends the cookie over HTTPS.
- httpOnly - Ensures the cookie is sent only over HTTP(S), not client JavaScript, helping to protect against cross-site scripting attacks.
- domain - indicates the domain of the cookie; use it to compare against the domain of the server in which the URL is being requested. If they match, then check the path attribute next.
- path - indicates the path of the cookie; use it to compare against the request path. If this and domain match, then send the cookie in the request.
- expires - use to set expiration date for persistent cookies.
## Ensure your dependencies are secure

$ npm audit
* More security with Snyk
$ npm install -g snyk
$ cd your-app
$ snyk test
$ snyk wizard
1.What do you think about same-ogin vs cors-orgin?

| Client origin | Server origin | Same Origin Reques |
|--- |--- |--- |
| http://127.0.0.1:3000 | http://127.0.0.1:3000 | |
| http://127.0.0.1:3000 | https://127.0.0.1:3000 | |
| http://localhost:3000 | http://127.0.0.1:3000 | |
| http://localhost:3000 | http://127.0.0.1:1000 | |
| http://localhost:3000 | http://localhost:1000 | |
| file:///Users/hossain/ch02/client.html | http://localhost:1000 | |

But remember that the origin comparison only compares the
string values of the scheme, host, and port, and knows nothing about what host an IP
address maps to. In this example, “localhost” and “127.0.0.1” are different strings, and
therefore the request isn’t a same-origin request. Now that you know what an origin is,
let’s look at how the browser sets the Origin header on requests.


2. CROS life cycle?
   c2.png
3. What the different between User and Client?
4. user-vs-client.png?
5. What different Access-Control-Request-Method vs Access-Control-Allow-Methods?
6. What is Cross-Site Request Forgery(CSRF) in simple words?

### Here is a recap of each header:
#### ■ Access-Control-Allow-Origin:
– Use the * value to allow requests from all origins.
– Use a whitelist to allow only certain origins.
#### ■ Access-Control-Allow-Credentials:
– Setting the value to true allows cookies on requests.
– Enable cookies only if you’re sure you need them.
– If your server does support cookies, be sure to also validate the origin and
implement CSRF protection.
#### ■ Access-Control-Allow-Methods:
– This header only needs to be present on preflight responses.
– It indicates which HTTP methods are allowed on a URL.
– Common values include HEAD, OPTIONS, GET, POST, PUT, PATCH, and DELETE.
#### ■ Access-Control-Allow-Headers:
– This header only needs to be present on preflight responses.
– It indicates which HTTP headers are allowed on a URL.
– Echo the Access-Control-Request-Headers value to get full header support.
#### ■ Access-Control-Max-Age:
– This header only needs to be present on preflight responses.
– It indicates how many seconds to cache preflight requests for.
– Browsers may have their own maxAge caps.
#### ■ Access-Control-Expose-Headers:
– This header indicates which response headers to expose to clients.
– It’s an optional header that isn’t required for a successful CORS request
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
4. user-vs-client.png

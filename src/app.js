const path = require("path");
const hbs = require("hbs");
const express = require("express");
const forecast = require("./utils/forecast");
/** What the express library exposes is just a single function, therefore, express is actually a single function as opposed to something like an object and we call it to expose a new express application */

// console.log(__dirname);
// console.log(path.join(__dirname, '../public'));

const app = express();
/** The express functiton doesn't take in any arguments, instead we configure our server by using various methods provided by the application itself */

const port = process.env.PORT || 3000;

//  Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//  Setup handlebars engine and views location
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);
/** registerPartials takes a path to the directory where your partials live */
app.set("views", viewsPath);
/** set() allows you to set a value for a given express setting and they are a few; we have a key, the setting name, and the value we want to set for the setting. */

//  Setup static directory to serve
app.use(express.static(publicDirectoryPath));
/** app.use is used as a way to customise your server.
 * express.static is a function and we're calling it and we're passing its return value into use. static takes the path to the folder we want to serve up.
 * Static means that the assets are static, they do not change. A static web page can sometimes be your preferred but sometimes it might not be.
 */

// app.get("", (req, res) => {
//   res.send("<h1>Weather</h1>");
/** This allows us to send something back to the requestor so if someone's making a request from code using something like the npm request library, they'll get this back. If they're making a request from the browser then this is what's going to display in the browser window */
// });
/** This function lets us configure what the server should do when someone tries to get the resource at a specific url. Maybe we should be sending back HTML or maybe we could be sending back JSON.
 * The get() method takes in two arguments, the first is the route i.e. the partial url and the second argument is a function and the function is where we describe what we want to do when someone visits the route that we specify. The function is called with two very important arguments; the first is an object containing information about the incoming request to the server, the other argument is the response and this contains a bunch of methods allowing us to customise what we're going to send back to the requester. In the function we can then look at the request and figure out what we want to do. We could do something like read data from the database or create some HTML and we could use various methods on 'response' to actually send a repsonse back
 */

// app.get("/help", (req, res) => {
//   res.send([{
//       name: 'Nony'
//   }, {
//       name: 'Andew'
//   }]);
// });

// app.get("/about", (req, res) => {
//   res.send("<h1>About Page</h1>");
// });

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Nony",
  });
  /** render allows us to render one of our views. We've configured Express to use the view engine, hbs. So with render, we can render one of our handlebars templates. All we need to do is to provide as the first argument, the name of the particular view we want to use. Then the second argument is an object which contains all of the values we want that view to be able to access. */
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Nony",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "This is the help page",
    title: "Help",
    name: "Nony",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  forecast(req.query.address, (error, data) => {
    if (error) {
      return res.send({
        error: "Unable to find location. Try another search."
      });
    }

    res.send({
      data: data,
      location: req.query.address
    });
  });
});

/** Goal: Wire up / weather
 * 1. Require geocode/forecast into app.js
 * 2. Use the address to geocode
 * 3. Use the coordinates to get forecast
 * 4. Send back the real forecast and location
 */

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});
/** Query strings get provided on the end of the url. It starts with a question mark '?' then we provide key value pairs to provide additional information to the server
 * The format is: "localhost:3000/products?key=value"
 * For an e-commerce site, I might want users to be able to search amongst the list of products for a specific one and for that I could say
 * "localhost:3000/products?search=games"
 * and if you hit enter it will fire off another request to the express server but it's going to pass along the additional information
 * If we want to separate the values we could do that using the ampersand '&' followed by another key value pair
 * "localhost:3000/products?search=games&rating=5"
 * When we pass information to the server through the use of query strings, the information will be available for us in our  route handler
 * Information about the query string lives on the 'req' object
 * The request object has a query property on there
 * query is also an object and it contains all of the query strings information
 */

app.get("/help/*", (req, res) => {
  res.render("404", {
    ErrorMessage: "Help article not found",
    title: "Help",
    name: "Nony",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    ErrorMessage: "Page not found",
    title: "404",
    name: "Nony",
  });
});
/** '*' stands for every url that has not been defined by us */

// app.listen(3000, () => {
//   console.log("Server is up on port 3000");
// });

app.listen(port, () => {
  console.log(`Server is up on port 3000 ${port}`);
});
/** We use this to start the server and we'll only use it a single time in our application. The function starts up the server and has it listen on a specific port. The other optional argument we can pass is a callback function which runs when the server is up and running */

/** The template engine that we're going to use is called 'handle bars'. Handle bars is going to allow to us to do two things
 * 1. It's going to allow us to render dynamic pages as opposed to static ones
 * 2. It's going to allow us to easily create code that we can reuse across the pages
 */

/** Partials as the name suggests allows you to create a little template which is part of a bigger web page. */

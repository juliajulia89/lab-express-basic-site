const express = require("express");
const path = require("path");
const hbs = require("hbs");

const app = express();

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));


//hbs.registerPartials(path.join(__dirname, "/views/gallery"));
//app.all("/home", (request, response) => {
  //response.sendFile(path.join(__dirname, "views", "home.html"));
//});
app.use(express.static(path.join(__dirname, "public")));

app.all("/home", (request, response) => {
  response.render("home");
});

app.all("/about", (request, response) => {
  response.render("about");
});

app.all("/works", (request, response) => {
  response.render("works");
});

app.all("/gallery", (request, response) => {
  response.render("gallery");
});

app.listen(3000, () => {
  console.log("Yey APP running");
});

//app.js

//jshint esversion:6
const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const ejs = require("ejs");
// lodash for string case conversion
const _ = require("lodash");
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. ";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. ";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. ";
let posts = [];

// create routes
app.get("/", function(req,res) {
  res.render("home", {homeIntro: homeStartingContent, posts: posts})
});
app.get("/about", function(req,res) {
  res.render("about", {aboutIntro: aboutContent})
});
app.get("/contact", function(req,res) {
  res.render("contact", {contactIntro: contactContent})
});
app.get("/compose", function(req,res) {
  res.render("compose")
});

app.post("/compose", function(req,res) {

  const post = {
    title: req.body.postTitle,
    content: req.body.postBody,
    published: req.body.field
  };
  posts.push(post);
  res.redirect("/");
});

app.get('/posts/:postName', function (req, res) {
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);
    if (storedTitle === requestedTitle){
      res.render("post", {title: post.title, content: post.content})
    }});
});

app.listen(process.env.PORT || 3100, function() {
    console.log('Server running on port 3100 \nurl localhost:3100')
});

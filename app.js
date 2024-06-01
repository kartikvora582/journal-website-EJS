//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const posts = []

app.get('/', function(req, res) {
  res.render(__dirname+'/views/home.ejs',
  {
    startingContent: homeStartingContent,
    posts: posts
    // the post here shares the post array to home.ejs so it can log there
  });
});

app.get('/about', function(req, res) {
  res.render(__dirname+'/views/about.ejs', {aboutContent: aboutContent});

});
app.get('/contact', function(req, res) {
  res.render(__dirname+'/views/contact.ejs', {contactContent: contactContent});
});

app.get('/compose', function(req, res) {
  res.render(__dirname+'/views/compose.ejs');
});

app.get('/:posts/:postName', (req, res) => {
  var requestedTitle = req.params.postName
  for (let i = 0; i < posts.length; i++){
    if (_.lowerCase(posts[i].title) == _.lowerCase(requestedTitle)) {
      // this is a function of lodash library that helps to convert multiword or upper/lowercse naming of url to a lower case string recongnized by url.
      res.render(__dirname+'/views/post.ejs',
      {titlePost: posts[i].title,
      contentPost: posts[i].content});
    }
  }
})

app.post('/compose', function(req,res){
  const post = {
    title : req.body.postTitle,
    content: req.body.postBody
  };
  posts.push(post)
  res.redirect('/')
})










app.listen(3000, function() {
  console.log("Server started on port 3000");
});

const express = require('express');
const app = express();

const port = 3030;
const path = require('path'); 
const { v4: uuidv4 } = require('uuid');
var methodOverride = require('method-override')


app.use(methodOverride('_method'))
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express .static(path.join(__dirname,"public")));


let posts = [
    {
        id: uuidv4(),
        username: "omkar",
        caption : "hello world",
    },
    {
        id: uuidv4(),
        username: "abc",
        caption : "hello omkar",
    },
    {   
        
        id: uuidv4(),
        username: "xyz",
        caption : "this is my first quora post",
    },
];

app.use(express.urlencoded({extended : true}));

app.get("/posts", (req, res) => {
    res.render("index.ejs", {posts});
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs"); 
});

app.post("/posts/", (req, res) => {
    let {username, caption} = req.body;
    let id = uuidv4();
    posts.push({id,username, caption});    
    res.redirect("/posts");
});
app.get("/posts/:id", (req, res) => {
    const {id} = req.params;
    let post = posts.find((p) => id === p.id);
    
    res.render("show.ejs" , {post});
});

app.patch("/posts/:id", (req, res) => {
    const {id} = req.params;
    
    let newcaption = req.body.caption;
    let post = posts.find((p) => id === p.id);
    post.caption = newcaption;
    console.log(post); 
     
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
    const {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs" , {post});
});

app.delete("/posts/:id", (req, res) => {
    const {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    
});
const express = require("express");
const port = 8080;


const app = express();

app.get("/", (req, res)=>{
    res.send("Home page ");
});

app.listen(port, ()=>{
    console.log("App is listening on port 8080");
});
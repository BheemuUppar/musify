const express = require("express");
require('dotenv').config();

const app = express();

const port = process.env.PORT || 3000;

app.listen(port,()=>{
  console.log(process.env)
console.log("Application Running on "+port)
})



app.use((err, req, res, next) => {
  if (err) {

     res.status(500).send("Internal Server Error")
}


});

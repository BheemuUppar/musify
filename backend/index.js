const express = require("express");

const app = express();

const port = 3000;

app.listen(port,()=>{
console.log("Application Running on "+port)
})



app.use((err, req, res, next) => {
  if (err) {

     res.status(500).send("Internal Server Error")
}


});

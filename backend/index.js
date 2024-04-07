const express = require("express");
require("dotenv").config(); // .env config
const bodyParser = require('body-parser')
const AuthRouter = require("./src/routes/auth");
const cors = require("cors")

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/auth", AuthRouter );

app.get("**" , (req ,res)=>{
  res.status(404).send("<h1>404 not found<h1>");
  res.end()
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Application Running on " + port);
});

app.use((err, req, res, next) => {
  if (err) {
    res.status(500).send("Internal Server Error");
  }
});

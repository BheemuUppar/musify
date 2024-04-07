// this file is for login/signup logic

const express = require("express");
const router = express.Router();
const zod = require("zod");
const user = require("../db/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

// register payload schema validation
const signUpSchema = zod.object({
  username: zod.string(),
  password: zod.string().min(6),
  email: zod.string().email(),
});
// register payload schema validation
const signInSchema = zod.object({
  password: zod.string().min(6),
  email: zod.string().email(),
});

router.post("/signup", async (req, res) => {
  let body = req.body;
  let validate = signUpSchema.safeParse(body);
  if (!validate.success) {
    res.status(409).json({ message: "Invalid Payload" });
    return;
  }
  // check if user not exist already with same email
  let dbResponse = await user.findOne({ email: body.email });
  if (dbResponse == null) {
    bcrypt.hash(
      body.password,
      parseInt(process.env.saltRounds),
      async (error, result) => {
        if (!error) {
          body.password = await result;
          let data = await user.create({ ...body });
          if (data) {
            res.status(201).json({ message: "user registered successfully" });
          }
        } else {
          res.json("Internal Server Error");
        }
      }
    );
  } else {
    res.json({ message: "user already exist" });
  }
});

// for signin
router.post("/signin", async (req, res) => {
  let body = req.body;
  let validate = signInSchema.safeParse(body);
  if (!validate.success) {
    res.status(409).json({ message: "Invalid Payload" });
    return;
  }
  // check if user not exist already with same email
  let dbResponse = await user.findOne({ email: body.email });
  if (dbResponse != null) {
    bcrypt.compare(
      body.password, 
      dbResponse.password,
      async (error, result) => {
        if(result){
         let token = await jwt.sign({email:dbResponse.email} ,process.env.jwtSecretekey, {expiresIn:"30m"} )
         res.status(200).json({message:"success", token:token})
        }
        else{
          res.status(401).json({message:"Invalid username and password"})
        }
      }
    );
  } else {
    res.json({ message: "user not exist" });
  }
});

router.get("**", (req, res) => {
  res.send("not found");
});

module.exports = router;

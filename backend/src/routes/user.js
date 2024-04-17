const express = require("express");
const router = express.Router();
const UserDb = require("../db/User");

router.post("/createPlaylist", async (req, res) => {
  let playlistName = req.body.playlistName;
  let email = req.body.email;

  try {

    // edge case here first we need check whether play list name exist ?
    let user = await UserDb.findOne({email:email});
    if(user[playlistName] == false){
        let result = await UserDb.findOneAndUpdate(
            { email: email },
            { $set: { [`playList.${playlistName}`]: [] } }
          );
          res.status(201).json({ message: "playlist created" });
    }
    else{
        res.status(200).json({ message: "playlist with same name exist" });
    }
  } catch (error) {
    console.error(error);
    res.send("internal server error")
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const UserDb = require("../db/User");

router.post("/createPlaylist", async (req, res) => {
  let playlistName = req.body.playlistName;
  let email = req.body.email;

  try {
    // edge case here first we need check whether play list name exist ?
    let user = await UserDb.findOne({ email: email });
    if (user[playlistName] == false) {
      let result = await UserDb.findOneAndUpdate(
        { email: email },
        { $set: { [`playList.${playlistName}`]: [] } }
      );
      res.status(201).json({ message: "playlist created" });
    } else {
      res.status(200).json({ message: "playlist with same name exist" });
    }
  } catch (error) {
    console.error(error);
    res.send("internal server error");
  }
});

router.post("/getLibrary", async (req, res) => {
  let email = req.body.email;
  let playList = await UserDb.findOne({ email: email }).select("playList");
  console.log(playList.playList);
  res.status(200).json(playList.playList);
});

router.post("/addSongtoPlayList", async (req, res) => {
  let { email, songId, playlistName } = req.body;
  let isUserExistBool = await isUserExist(email);
  let isPlayListExistBool = await isPlaylistExist(email, playlistName);

  try {
    if (isUserExistBool && isPlayListExistBool) {
      let isSongExist = await isSongExistInPlaylist(
        email,
        playlistName,
        songId
      );
      if (isSongExist) {
        res
          .status(409)
          .json({ message: "song already exist in same playlist" });
          return
      }
      let response = await UserDb.findOneAndUpdate(
        { email: email },
        { $push: { [`playList.${playlistName}`]: songId } },
        { new: true }
      );

      if (response) {
        res
          .status(201)
          .json({ message: "Song added to playlist successfully" });
      } else {
        res.status(400).json({ message: "User not found with the email id" });
      }
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "something up with the server! please try again after some time",
    });
  }
});

async function isPlaylistExist(email, playlistName) {
  let playList = await UserDb.findOne({ email: email }).select("playList");
  console.log(playList);
  if (playList.playList[playlistName]) {
    return true;
  } else {
    return false;
  }
}
async function isUserExist(email) {
  let playList = await UserDb.findOne({ email: email });
  if (playList) {
    return true;
  } else {
    return false;
  }
}

async function isSongExistInPlaylist(email, playlistName, songId) {
  let playList = await UserDb.findOne({ email: email }).select("playList");

  if (playList.playList[playlistName].includes(songId)) {
    return true;
  } else {
    return false;
  }
}

module.exports = router;

const express = require("express");
const router = express.Router();
const UserDb = require("../db/User");
const Playlist = require("../db/Playlist");
const { getSongsById } = require("../controller/saavnApi");

router.post("/createPlaylist", async (req, res) => {
  let playlistName = req.body.playlistName;
  let { email, ...playlistData } = req.body;

  try {
    let createdPlaylist = await Playlist.create({...playlistData, songs: [], type:"playlist" ,  image:[{"url":null}]})
    // edge case here first we need check whether play list name exist ?
    let user = await UserDb.findOne({ email: email }).select("playList");
    if ( user) {
      let result = await UserDb.findOneAndUpdate(
        { email: email },
        { $push: { playList: createdPlaylist._id } }
      );
      res.status(201).json({ message: "playlist created" });
    } else {
      res.status(200).json({ message: "playlist with same name exist"});
    }
  } catch (error) {
    console.error(error);
    res.send("internal server error");
  }
});

router.post("/getLibrary", async (req, res) => {
 try{
  let email = req.body.email;
  let playList = await UserDb.findOne({ email: email }).select("playList");
   let list = playList.playList;
   console.log(list)
  if (playList) {
    let results = await Playlist.find({ _id: { $in: list } });
    // let results = await formatePlayList(playList.playList);
    res.status(200).json(results);
    return;
  }
  res.status(400).json({ message: "user not found" });
 }catch(err){
  res.status(500).json({ message: "Internal Server Error" });
 }
});

router.post("/addSongtoPlayList", async (req, res) => {
  let { email, songId, playlistId } = req.body;
  let isUserExistBool = await isUserExist(email);
  let isPlayListExistBool = await isPlaylistExist(email, playlistId);
  console.log(isUserExistBool, isPlayListExistBool);

  try {
    if (isUserExistBool && isPlayListExistBool) {
      let isSongExist = await isSongExistInPlaylist(
        email,
        playlistId,
        songId
      );
      if (isSongExist) {
        res
          .status(409)
          .json({ message: "song already exist in same playlist" });
        return;
      }
      let response = await Playlist.findOneAndUpdate(
        { email: email, "playList.name": playlistName },
        { $push: { "playList.$.songs": songId } },
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

async function formatePlayList(playList) {
  let result = [];
  console.log(playList)
  let obj;
  if(false){

    for (const playlist of playList) {
      let arr = [];
      for (let id of playlist.songs) {
        let song = await getSongsById(id);
        arr.push(song[0]);
      }
      playlist.songs = arr;
      result.push(playlist);
    }
  }
  return result;
}

async function isPlaylistExist(email, playlistName) {
  let playList = await UserDb.findOne({ email: email }).select("playList");
  if (playList.playList) {
    for (let obj of playList.playList) {
      if (obj.name == playlistName) {
        console.log(obj.name, playlistName, true);
        return true;
      }
    }
    return false;
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

async function isSongExistInPlaylist(email, playlistId, songId) {
  let playList = await UserDb.findOne({ email: email }).select("playList");
  for (let playlist of playList.playList) {
    if(playlist._id == playlistId){
     return  playlist.songs.includes(songId) ? true:false;
    }
  }
  return false
 
}

module.exports = router;

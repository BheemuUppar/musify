const express = require("express");
const router = express.Router();
const UserDb = require("../db/User");
const Playlist = require("../db/Playlist");
const { getSongsById } = require("../controller/saavnApi");

router.post("/createPlaylist", async (req, res) => {
  let playlistName = req.body.playlistName;
  let { username, email, image, songs , ...playlistData  } = req.body;

  try {
    let createdPlaylist = await Playlist.create({
      email,
      username,
      ...playlistData,
      songs: songs?songs:[],
      type: "playlist",
      image: image?image:[{ url: null }],
    });
    // edge case here first we need check whether play list name exist ?
    let user = await UserDb.findOne({ email: email }).select("playList");
    if (user) {
      let result = await UserDb.findOneAndUpdate(
        { email: email },
        { $push: { playList: createdPlaylist._id } }
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
  try {
    let email = req.body.email;
    let playList = await UserDb.findOne({ email: email }).select("playList");
    let list = playList.playList;
    //  console.log('list', list)
    if (playList) {
      let results = await Playlist.find({ _id: { $in: list } });
      // console.log(results)
      let data = await formatePlayList(results);
      res.status(200).json(data);
      return;
    }
    res.status(400).json({ message: "user not found" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/addSongtoPlayList", async (req, res) => {
  let { songId, playlistId } = req.body;
  // let isUserExistBool = await isUserExist(email);
  // let isPlayListExistBool = await isPlaylistExist(email, playlistId);

  /**
   * find playlist object id from user table
   * update playlist table based on Object id
   */
  try {
    let data = await Playlist.findOne({ _id: playlistId }).select("songs");
    if (!data.songs.includes(songId)) {
      let response = await Playlist.findOneAndUpdate(
        { _id: playlistId },
        { $push: { songs: songId } }
      );
      res.status(201).json({ message: "Song added to playlist successfully" });
    } else {
      res.status(409).json({ message: "song already exist in same playlist" });
      return;
    }
  } catch (err) {
    console.log(err);
  }

  // try {
  //   if (isUserExistBool && isPlayListExistBool) {
  //     let isSongExist = await isSongExistInPlaylist(
  //       email,
  //       playlistId,
  //       songId
  //     );
  //     if (isSongExist) {
  //       res
  //         .status(409)
  //         .json({ message: "song already exist in same playlist" });
  //       return;
  //     }
  //     let response = await Playlist.findOneAndUpdate(
  //       { email: email, "playList.name": playlistName },
  //       { $push: { "playList.$.songs": songId } },
  //       { new: true }
  //     );

  //     if (response) {
  //       res
  //         .status(201)
  //         .json({ message: "Song added to playlist successfully" });
  //     } else {
  //       res.status(400).json({ message: "User not found with the email id" });
  //     }
  //   } else {
  //     throw new Error();
  //   }
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).json({
  //     message: "something up with the server! please try again after some time",
  //   });
  // }
});
router.post("/deletePlaylist", async (req, res)=>{
let email = req.body.email;
let playlistId = req.body.playlistId;

try{
  let response = await UserDb.findOneAndUpdate({email:email}, {$pull:{'playList':playlistId}});
  if(response){
    res.status(200).json({message:"playlist deleted successfully"})
  }
  else{
    throw Error;
  }
}catch(err){
  res.status(500).json({message:"failed to delete Playlist, try again later"})
}


})

async function formatePlayList(playlists) {
  let result = [];
  try {
    if (playlists && playlists.length > 0) {
      for (let j = 0; j < playlists.length; j++) {
        let playlist = playlists[j];
        let arr = [];
        for (let i = 0; i < playlist.songs.length; i++) {
          let song = await getSongsById(playlist.songs[i]);
          arr.push(song[0]);
        }
        playlist.songs = arr;
        result.push(playlist);
      }
      return result;
    }
  } catch (err) {
    console.log(err);
  }
}



async function isPlaylistExist(email, playlistName) {
  let playList = await Playlist.findOne({ email: email });
  if (playList.name == playlistName) {
    // for (let obj of playList.playList) {
    //   if (obj.name == playlistName) {
    //     return true;
    //   }
    // }
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

async function isSongExistInPlaylist(email, playlistId, songId) {
  let playList = await UserDb.findOne({ email: email }).select("playList");
  for (let playlist of playList.playList) {
    if (playlist._id == playlistId) {
      return playlist.songs.includes(songId) ? true : false;
    }
  }
  return false;
}

module.exports = router;

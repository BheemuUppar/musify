const express = require("express");
const router = express.Router();
const axios = require("axios");
const { searchById, getSongsById } = require("../controller/saavnApi");
const Playlist = require("../db/Playlist");

// for playlist
router.get("/playlist/:query", async (req, res) => {
  try {
    let query = req.params.query;
    const data = await axios.get(
      `${process.env.savanBaseUrl}/search/playlists?query=${query}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    //   .then(async (data) => {
    res.status(200).json(data.data.data.results);
    //   }).catch(e=>{

    //   });
  } catch (error) {
    res.status(500).json({ message: "failed" });
  }
});
// albums
router.get("/albums/:query", async (req, res) => {
  try {
    let query = req.params.query;
    const data = await axios.get(
      `${process.env.savanBaseUrl}/search/albums?query=${query}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    //   .then(async (data) => {
    res.status(200).json(data.data.data.results);
    //   }).catch(e=>{

    //   });
  } catch (error) {
    res.status(500).json({ message: "failed" });
  }
});
// songs
router.get("/songs/:query", async (req, res) => {
  try {
    let query = req.params.query;
    const data = await axios.get(
      `${process.env.savanBaseUrl}/search/songs?query=${query}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    //   .then(async (data) => {
    res.status(200).json(data.data.data.results);
    //   }).catch(e=>{

    //   });
  } catch (error) {
    res.status(500).json({ message: "failed" });
  }
});

// for artists search
router.get("/artists/:query", async (req, res) => {
  try {
    let query = req.params.query;
    const data = await axios.get(
      `${process.env.savanBaseUrl}/search/artists?query=${query}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    //   .then(async (data) => {
    res.status(200).json(data.data.data.results);
    //   }).catch(e=>{

    //   });
  } catch (error) {
    res.status(500).json({message:"Internal Server Error"})
  }
});

router.get("/songsById/:id", async (req, res) => {
  try{

    searchById("songs", req, res);
  }catch(err){
    res.status(500).json({message:"Internal Server Error"})
  }
});

router.get("/playlistById/:id", async (req, res) => {
  try{
    searchById("playlists", req, res);
  }catch(err){
    res.status(500).json({message:"Internal Server Error"})
  }
});
router.get("/albumsById/:id", async (req, res) => {
  try{
    searchById("albums", req, res);
  }catch(err){
    res.status(500).json({message:"Internal Server Error"})
  }
});

router.post("/collaborationPlaylists", async (req, res) => {
 try{
  const { email } = req.body;
  const playlists = await Playlist.find({
    email: { $ne: email },
    collaborative: true,
  });

  if (playlists.length > 0) {
    for (let playlist of playlists) {
      let songs = [];
      // Use Promise.all to wait for all async operations to complete
      await Promise.all(
        playlist.songs.map(async (songId) => {
          const song = await getSongsById(songId);
          songs.push(JSON.parse(JSON.stringify(song[0])));
        })
      );

      playlist.songs = JSON.parse(JSON.stringify(songs));
    }
  }

  res.status(200).json(playlists);
 }catch(err){
  res.status(500).json({message:"Internal Server Error"})
 }
});

module.exports = router;

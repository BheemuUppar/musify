const express = require("express");
const router = express.Router();
const axios = require("axios");
const {searchById} = require("../controller/saavnApi")

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
    res.status(500).json({ message: "failed" });
  }
});


router.get("/songsById/:id", async (req, res) => {
 searchById("songs", req, res);
});

router.get("/playlistById/:id", async (req, res) => {
 searchById("playlists", req, res);
});
router.get("/albumsById/:id", async (req, res) => {
 searchById("albums", req, res);
});


module.exports = router;

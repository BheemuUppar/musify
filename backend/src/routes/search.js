const express = require("express");
const router = express.Router();
const axios = require("axios");

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

router.get("/playlistById/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await axios.get(
      `${process.env.savanBaseUrl}/playlists?id=${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    //   .then(async (data) => {
    res.status(200).json(data.data);
    //   }).catch(e=>{

    //   });
  } catch (error) {
    res.status(500).json({ message: "failed" });
  }
});

module.exports = router;

const axios = require("axios")

 async function searchById(type,req, res){
    const id = req.params.id;
    try {
      const data = await axios.get(
        `${process.env.savanBaseUrl}/${type}?id=${id}`,
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
  }

  async function getSongsById(id){
    const data = await axios.get(
        `${process.env.savanBaseUrl}/songs/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
     
      return data.data.data;
  }

  module.exports = {searchById , getSongsById}
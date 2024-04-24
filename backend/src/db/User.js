const mongoose = require("mongoose");
const Playlist = require("../db/Playlist");
mongoose.connect(`mongodb+srv://${process.env.mongooseusername}:${process.env.mongoosepassword}@cluster0.mp9cu9j.mongodb.net/music`).then(()=>{
    console.log('connected...');
})

const userSchema = mongoose.Schema({
  username: { type: String, require: true },
  password: { type: String, require: true },
  email: { type: String, require: true },
  friends: { type: Array }, // array of user id
  favorite: { type: Array }, // array of favorites songs id
  liked: { type: Array }, // array of songs id of liked songs
  playList: [{
    type:mongoose.Schema.Types.ObjectId,
  
    ref:"Playlist",
  }], // array of objects {playlistName:[songs id]}
  reccentSerches: { type: Array }, // Array of recent Serched keywords
  friendRequests:{type:Array} // friend Request list

});


// bheemuk123
// F4w0vdSuZB6tmmGV   -- mongose credential
// mongodb+srv://bheemuk123:F4w0vdSuZB6tmmGV@cluster0.mp9cu9j.mongodb.net/

const user = mongoose.model("User", userSchema);
module.exports = user;

const mongoose = require("mongoose");
const User = require('./User')
const PlaylistSchema = mongoose.Schema({
  name: String,
  image: Array,
  songs: Array,
  type: String,
  collaborative:Boolean,
  email:String,
  username:String,
});

const Playlist = mongoose.model("Playlist", PlaylistSchema);
// Middleware to remove playlist references from users when a playlist is deleted
// PlaylistSchema.pre('remove', function(next) {
//     const playlistId = this._id;
//     // Remove references to deleted playlist from all users
//     User.updateMany({}, { $pull: { playlists: playlistId } }, next);
//   });
module.exports = Playlist

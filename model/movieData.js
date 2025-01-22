const mongoose = require('mongoose');
const movieSchema = mongoose.Schema({
    movieName: String,
    movieDirector: String,
    movieDescription : String
})
const movieData = mongoose.model('movie', movieSchema);
module.exports = movieData;
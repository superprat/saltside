const mongoose = require('mongoose');

const birdSchema = new mongoose.Schema({
	id: {type:String, unique:true},
	name: String,
	family: String,
	continents: [String],
	added: Date,
	visible: Boolean
});


const Bird = mongoose.model('Bird', birdSchema);

module.exports = Bird;
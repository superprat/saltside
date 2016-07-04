const mongoose = require('mongoose');

const birdSchema = new mongoose.Schema({
	name: String,
	family: String,
	continents: [String],
	added: {type:Date, default:Date.now},
	visible: {type:Boolean , default:false}
});

birdSchema.set('toJSON', {
     transform: function (doc, ret, options) {
         ret.id = ret._id;
         ret.added = ret.added.toISOString().split('T')[0];
         delete ret._id;
         delete ret.__v;
     }
});

const Bird = mongoose.model('Bird', birdSchema);

module.exports = Bird;
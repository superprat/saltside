const Bird = require('../models/Bird');
const mongoose = require('mongoose');
/**
 * GET /birds
 */
exports.getBirds = (req, res) => {

	//Only visible birds should be returned
	Bird.find({ visible: true }, function(err, birdies) {
	  if (err) {
	  	console.error(err);
	  	return res.status(500).send();
	  }

	  return res.status(200).send(birdies);
	});

};


/**
 * GET /birds/:id
 */
exports.getBird = (req, res) => {

	if(!mongoose.Types.ObjectId.isValid(req.params.id))
 		return res.status(404).send('Bird not Found');

	Bird.findById(req.params.id, function (err, bird_data) {
		if (!err && bird_data != null) {
			return res.status(200).send(bird_data);
		} else {
			return res.status(404).send();
		}
	});


};

/**
 * POST /birds/
 */
exports.postBird = (req, res, next) => {


	req.checkBody('name', 'Name not found').notEmpty();
	req.checkBody('family', 'Family not found').notEmpty();
	req.checkBody('continents', 'Continents not found').notEmpty().isArray();
	req.checkBody('added','Date Format is incorrect').optional().isDate();
	req.checkBody('visible','Visible is incorrect data type').optional().isBool();

	var errors = req.validationErrors();

	if(errors){
		return res.status(400).send(errors);
	}


	var added = req.body.added;
	var visible = req.body.visible;

	var newBird = new Bird({
		name:req.body.name,
		family:req.body.family,
		continents:req.body.continents
	});

	console.log(added);

	if(added)
		newBird.set('added',new Date(added));

	if(typeof(visible) != "undefined")
		newBird.set('visible',visible);


	newBird.save((err) => {
		if (err)
		{
			console.error(err);
			return res.status(500).send();
		}

      return res.status(201).send(newBird);

    });

};


/**
 * DELETE /birds/:id
 */
 exports.deleteBird = (req, res, next) =>{

 	if(!mongoose.Types.ObjectId.isValid(req.params.id))
 		return res.status(404).send();

 	// get a user with ID of 1
	Bird.findById(req.params.id, function(err, bird) {
	  if (err) {
	  	console.error(err);
	  	return res.status(500).send();
	  }

	  if(bird == null)
	  	return res.status(404).send();

	  // save the user
	  bird.remove(function(err) {
	    if (err) {
		  	console.error(err);
		  	return res.status(500).send();
	  	}

	    return res.status(200).send();
	  });

	});


 }



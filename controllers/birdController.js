const Bird = require('../models/Bird');

/**
 * GET /birds
 */
exports.getBirds = (req, res) => {

	//Only visible birds should be returned

};


/**
 * GET /birds/:id
 */
exports.getBird = (req, res) => {


};

/**
 * POST /birds/
 */
exports.postBird = (req, res, next) => {


	req.checkBody('name', 'Name not found').notEmpty();
	req.checkBody('family', 'Family not found').notEmpty();
	req.checkBody('continents', 'Continents not found').notEmpty();

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

	if(added)
		newBird.set('added',new Date(added));

	if(typeof(visible) != "undefined")
		newBird.set('visible',visible);

	newBird.save((err) => {
      if (err) { return next(err); }

      return res.status(201).send('Created');

    });



};


/**
 * DELETE /birds/:id
 */
 exports.deleteBird = (req, res, next) =>{

 }
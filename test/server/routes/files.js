var express = require('express');
var router = express.Router();
var fs = require("fs")

/* Upload. */
router.post('/upload', function(req, res, next) {

	res.status(201);
	res.send("Created");
});


/* Download. */
router.get('/download', function(req, res, next) {
    res.download('./sample.pdf', 'sample-dirty-pdf.pdf')
});

module.exports = router;

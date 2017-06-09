var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Album List' });
});

/* GET All Albums page. */
router.get('/showAlbums', function (req, res) {
    var db = req.db;
    var collection = db.get('album');
    collection.find({}, {}, function (e, docs) {
        res.render('albumlist', {
            "albums": docs
        });
    });
});

/* Add New Album page. */
router.get('/newAlbum', function (req, res) {
    res.render('newalbum', { title: 'Add New Album' });
});

/* POST to Add User Service */
router.post('/newAlbum', function (req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var album = {
        name: req.body.name,
        artist: req.body.artist,
        year: req.body.year,
        genre: req.body.genre
    }

    // Set our collection
    var collection = db.get('album');

    // Submit to the DB
    collection.insert(
        album, function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            }
            else {
                // If it worked, set the header so the address bar doesn't still say /adduser
                //res.location("userlist");
                // And forward to success page
                res.redirect("/");
            }
        });
});

module.exports = router;
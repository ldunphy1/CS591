var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'HW1'});
});
router.get('/:name', function (req, res, next) {
    let theName = req.params.name
    let nameObj = {
        string: theName,
        length: theName.length
    }
    res.send(nameObj)
})

router.post('/', function (req, res, next) {
    let postName = req.body.name
    let postNameObj = {
        string: postName,
        length: postName.length
    }
    res.json(postNameObj)
})

module.exports = router;

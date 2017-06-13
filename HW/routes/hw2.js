var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
if (!mongoose.connection.db) {
    mongoose.connect('mongodb://localhost/hw2')
}
const db = mongoose.connection
const Schema = mongoose.Schema
const itemSchema = new Schema({
    name: String,
    length: String
})
const item = mongoose.model('item', itemSchema)

/* GET home page. */
router.get('/', function (req, res, next) {
    item.find({}, function (err, results) {
        let itemMap = {}
        results.forEach(function (result) {
            itemMap[result._id] = result
        })
        res.send(itemMap)
    })
});

router.get('/:name', function (req, res, next) {
    let theName = req.params.name
    item.find({name: theName}, function (err, results) {
        if (results.length > 0) {
            res.send(results)
        }
        else {
            let newItem = new item({
                    name: theName,
                    length: theName.length
                }
            )
            newItem.save()
            res.send(newItem)
        }
    })
})

router.post('/', function (req, res, next) {
    let postName = req.body.name
    let postNameObj = {
        name: postName,
        length: postName.length
    }
    item.find(postNameObj, function (err, results) {
        if (results.length > 0) {
            res.send(results)
        }
        else {
            let newPostNameObj = new item({
                name: postName,
                length: postName.length
            })
            newPostNameObj.save()
            res.send(newPostNameObj)
        }
    })
})

router.delete('/:name', function (req, res, next) {
    item.remove({name: req.params.name}, function (err, results) {
        if(results.result.n>0){
            res.json({message:'sucess'})
        }
        else{
            res.json({message:'string not found'})
        }

    })
})

module.exports = router;

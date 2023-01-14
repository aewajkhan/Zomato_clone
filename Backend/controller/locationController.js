// const { Db } = require("mongodb");
const dbObj = require("../Db/connect");
const collectionName = "locationinfo";

let database = null;

dbObj.connect(function (err) {
  if (err) {
    console.log(err);
  }
  database = dbObj.getDb();
});

const controller = {
  
    getDataByLocation: (req, res) => {
        let requestObj = {};
        if (req.query.location) {
            requestObj = {
                location: req.query.location
            }
        }
        if (req.query.restuarant) {
            requestObj.restuarant_id = req.query.restuarant;
        }
        // console.log(requestObj);

        // localhost:3500/restuarants?location=1
        database.collection(collectionName).find(requestObj).toArray((err, result) => {
            if (err) {
                res.status(500).send({message: 'Server side error'});
            } else {
                res.send({status: 200, message: 'Success', data: result});
            }
        })
    }
}

module.exports = controller;

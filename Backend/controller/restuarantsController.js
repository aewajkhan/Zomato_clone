const { Db } = require("mongodb");
const dbObj = require("../Db/connect");
const collectionName = "restuarantInfo";

let database = null;

dbObj.connect(function (err) {
  if (err) {
    console.log(err);
  }
  database = dbObj.getDb();
});

//localhost:3500/restuarants/getAll?page=1&limit=2
const controller = {
  getAllList: async (req, res) => {
    const queryParams = req.query;
    let filterObj = {};
    let sortObj = { restuarant_name: 1 }; // if 1 it means ascending, if -1 it means descending
    if (queryParams) {
      if (queryParams.cuisine) {
        // http://localhost:3500/restuarants/getAll?cuisine=1,2
        let cuisines = queryParams.cuisine.split(',');
        const cuisineArray = [];
        if (cuisines.length > 1) {
          cuisines.forEach(function (cuisine) {
            cuisineArray.push({
              cuisine: cuisine
            });
          });
          filterObj = {
            $or: cuisineArray,
          };
          // http://localhost:3500/restuarants/getAll?cuisine=1
        } else {
          filterObj = {
            cuisine: cuisines[0]
          }
        }
      }
      // * Greater than 500 Rs &&&&&& Less than 500 Rs
      console.log(filterObj)
      if (queryParams.cost) {
        let costObj = {};
        // http://localhost:3500/restuarants/getAll?cuisine=1,2&cost=gt
        // console.log(queryParams);
        if (queryParams.cost === "gt") {
            // means greater than 500
            costObj = { 
            $gt: 500  
          }
          // console.log($gt);
        } else {
            // means less than 500
            costObj =  { 
            $lt: 500 
          } 
        }
        // console.log(costObj);
        // if it already has the filters for cuisine
        // console.log(filterObj);
        if (filterObj["$or"]) {
            filterObj = {
                $and: [
                    filterObj,
                    {
                        cost: costObj,
                      },
                    ],
                  };
                }
                console.log(costObj)
              }
              // debugger;
              // ({$and:[{$or:[{cuisine:'1'},{cuisine:'2'}]},{cost:{$gt:600}}]})
              if (queryParams.sort) {
                  if (queryParams.sort === "hl") {
                      // high to low -> descending order
                      sortObj = {
                          cost: -1,
                        };
                      } else {
                          sortObj = {
                              // lh means low to high -> ascending order
                              cost: 1,
                            };
                          }
                        }
                      }
                      // debugger
                      // console.log(sortObj+"-------");
                      
                      // Pagination
                      //http://localhost:3500/restuarants/getAll?page=1&limit=3
                      const page = parseInt(req.query.page);
                      const limit = req.query.limit ? parseInt(req.query.limit) : 7;
                      const startIndex = (page - 1) * limit; // if page = 1, startIndex = 0;
                      // if page = 5, startIndex = 4 * 2 = 8;
                      const endIndex = page * limit; // endIndex = 2 if page = 1
                      
                      // if count = 7, you will have 4 pages
                      
                      const paginationInfo = {};
                      
                      const count = await database
                      .collection(collectionName)
                      .countDocuments({ _id: { $exists: true } });
                      // console.log("I am here");
    // console.log(count); // count = 7

    if (endIndex < count) {
      // 2 < 7
      paginationInfo.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      paginationInfo.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    database
      .collection(collectionName)
      .find(filterObj)
      .limit(limit)
      .skip(startIndex)
      .sort(sortObj)
      .toArray((err, result) => {
        // console.log(result);
        if (err) {
          res.status(500).send({ message: "Server side error" });
        } else {
          res.send({
            status: 200,
            message: "Data sent",
            data: result,
            total: count,
            paginationInfo: paginationInfo,
          });
        }
      });
  },
  
  getDataByLocation: async (req, res) => {
    let locationId = req.query.location;
    const count = await database
      .collection(collectionName)
      .countDocuments({ _id: { $exists: true } });
    // console.log(count);

    // // http://localhost:3500/restuarants/get?location=2

    database
      .collection(collectionName)
      .aggregate([
        {
          $match: { location: locationId },
        },
        {
          $lookup: {
            from: "locationinfo",
            localField: "location", // as part of the current collection (restuarantlist)
            foreignField: "location_id", // make sure that locations.location_id = restuarantlist.location
            as: "locationinfo",
          },
        },
      ])
      .toArray((err, result) => {
        if (result.length) {
          const firstResult = result[0];
          // console.log(firstResult);
          if (firstResult.locationinfo.length) {
            // if locations key is not empty, it means it is a valid location
            res.send({
              status: 200,
              message: "Data sent",
              data: result,
              total: count,
            });
          } else {
            res.status(403).send({ message: "Incorrect location" });
          }
        } else {
          res.send({ status: 200, message: "Success", data: result });
        }
      });
  }

  // getDataByrestaurantId: (req, res) => {
  //   const { res_Id } = req.Params;
  //   console.log(res_Id)
  //   database
  //   .collection(collectionName).find(res_Id)
  //     .then((responce) => {
  //       res
  //         .status(200)
  //         .json({
  //           message: "Restaurant data fetched Succefully",
  //           restaurant: responce,
  //         });
  //     })
  //     .catch((err) => {
  //       res.status(500).json({ error: err });
  //     });
  // },
};

module.exports = controller;

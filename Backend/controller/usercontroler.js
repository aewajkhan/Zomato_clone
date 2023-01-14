const dbObj = require("../Db/connect");
const collectionName = "userinfo";
const jwt = require("jsonwebtoken");
let database = null;

dbObj.connect(function (err) {
  if (err) {
    console.log(err);
  }
  database = dbObj.getDb();
});

module.exports = {
  authorise: (req, res) => {
    let token = req.headers["token"];
    // console.log(token)
    if (token) {
      jwt.verify(token, process.env.JWT_SECRETKEY, function (err, decoded) {
        // console.log(err)

        if (err) {
          res.status(403).send({ massage: "Login Failed" });
        } else if (decoded) {
          res.send({ status: 200, massage: "login successfull" });
        }
      });
    } else {
      res.status(403).send({ massage: "login failed!" });
    }
  },

  login: (req, res) => {
    database
      .collection(collectionName)
      .find({
        username: req.body.username,
        password: req.body.password,
        // first_name: req.body.first_name,
        // last_name: req.body.last_name,
      })
      .toArray((err, result) => {
        // console.log(err);
        if (err) {
          res.status(500).send({ massage: "server side error" });
        } else {
          if (result.length > 0) {
            // let token = jwt.sign(
            //   {
            //     username: req.body.username,
            //   },
            //   process.env.JWT_SECRETKEY,
            //   // { expiresIn: "1hr" }
            // );
            // res.send({
            //   status: 200,
            //   massage: "success",
            //   data: { token: token },
            // });
            res.send({status:200,message:'login succesful!', data:result})
          } else {
            res
              .status(403)
              .send({ massage: "inavalid credential,permission denied" });
          }
        }
      });
  },
  create: (req, res) => {
    database
      .collection(collectionName)
      .insertOne({
        username: req.body.username,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        location:req.body.location
      },(err,result)=>{
        if(!err) {
          res.send({status:200,message:'data sent',data:result})
        }
        
      })
  },
};

const express = require("express");
const router = express.Router();
const userController= require('../controller/usercontroler')
const collectionName = "userinfo";

const jwt = require("jsonwebtoken");

let dbobj =require('../Db/connect');
let database=null;

dbobj.connect(function(err){
    if(err){
        console.log(err);
    }
    database= dbobj.getDb();
})

router.get('/authorise', userController.authorise)

router.post("/login", userController.login)

// router.post('/loginpost',userController.)

router.post('/create',userController.create)

// router.get('/authorise',(req,res)=>{
//     let token =req.headers['token'];
//     if(token){

   
//     jwt.verify(token,'secretkey',function(err,decoded){
//         if(err){
//             res.status(403).send({message:'login failed'})
//         }else if(decoded){
//             res.send({status:200, message:'Login successful!'})
//         }
//     })
// }else{
//     res.status(403).send({message:'Login failed!'})
// }
// })

// router.get("/login", (req,res)=>{
//    database.collection(collectionName).find({
//     username:req.body.username,
//     password:req.body.password
//    }).toArray((err,result)=>{
//     console.log(err)
//     if(err){
//         res.status(500).send({message:'server eror'})
//     }else{
//         if(result.length>0){
//             let token =jwt.sign({
//                 username:req.body.username
//             },'secretkey',{expiresIn:'1hr'})
//             res.send({status:200, message:'Success',data:{token:token}});
//         }else{
//             res.status(403).send({message:'Invalid credentials,permission denied'})
//         }
//     }
//    })
// })
router.get("/pay", async(req,res)=>{
    let storeItems= await database.collection(collectionName).find().toArray((err,result)=>{
      if(err){
        console.log(err)
      }
      if(result.cost){
    res.send({data:result,message:"data sent"});
      }
    console.log(storeItems)
      });
  
  })

module.exports = router;

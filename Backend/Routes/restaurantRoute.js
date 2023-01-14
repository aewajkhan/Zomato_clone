const express =require('express');
const router =express.Router();




const restuarantController= require('../controller/restuarantsController')



//localhost:3500/restuarants/getAll
// router.get('/locations'(req,res)=>{

// })


router.get('/getAll',restuarantController.getAllList)
// router.get('/restaurant:res_Id',restuarantController.getDataByrestaurantId)


router.get('/get',restuarantController.getDataByLocation)


module.exports=router;
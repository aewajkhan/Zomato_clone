const express =require('express');
const router =express.Router();

const locationController= require('../controller/locationController')






// router.get('/',locationController.getDataByLocation)

router.get('/Rlocations',locationController.getDataByLocation)

module.exports=router;
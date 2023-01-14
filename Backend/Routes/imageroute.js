const express = require("express");
const router = express.Router();
const path = require("path");
const currentPath = __dirname;

//localhost:3500/images/breakfast.png

//req.body-> localhost:3500/login
//req.query -> localhost:3500/restuarants?location=1 -> req.query.location
//req.params-> localhost:3500/images/brakefast.png -> req.params.file_name
router.get("/:file_name", function (req, res) {
  let imageName = req.params.file_name;
  // res.sendfile(imageName)
  console.log("image_name:" + imageName);
  console.log("_dirname -" + currentPath);

  const filepath = path.join(currentPath, "../images/" + imageName);
  console.log("file_Path-" + filepath);

    res.sendFile(filepath);

  // res.send({
  //   status: 200,
  //   massage: "success",
  //   data: { filepath: filepath },
  // });
});

module.exports = router;

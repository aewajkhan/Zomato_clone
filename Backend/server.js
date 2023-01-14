const app = require("./Routes/config");
const dotenv=require('dotenv');

dotenv.config();
const port= process.env.port;




app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

app.listen(port, () => {
console.log("this is 3500 server"+"-"+ port)
});

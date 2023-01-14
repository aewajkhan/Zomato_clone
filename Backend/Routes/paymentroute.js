const express = require("express");
const router = express.Router();

require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

let database = null;

// dbObj.connect(function (err) {
//   if (err) {
//     console.log(err);
//   }
//   database = dbObj.getDb();
// });

// const storeItems=req

const storeItems = new Map([
  [1, { priceInCents: 1000, name: "Learn Express" }],
  [2, { priceInCents: 2000, name: "Learn MongoDB" }]
]);
// router.get("/pay", async(req,res)=>{
//   let storeItems= await database.collection(collectionName).find().toArray((err,result)=>{
//     if(err){
//       console.log(err)
//     }
//     if(result.cost){
//   console.log({data:result,message:"data sent"});
//     }
//   console.log(storeItems)
//     });

// })
// console.log(storeItems)
//localhost:3500/payment/create-checkout-session
router.post("/create-checkout-session", async (req, res) => {
  console.log(req.body);
  // console.log(process.env.STRIPE_PRIVATE_KEY);
  // res.send({massage:"hello wrold"})

  try {
    const session = await stripe.checkout.sessions.create({
      //kind pof payment you r gping to accept
      payment_method_types: ["card"],
      //kind of payment ,can be  a one time payment (payment) /subcription (subcription)/ emi(emi)
      mode: "payment",
      success_url: `${process.env.SERVER_URL}/success.html`,
      cancel_url: `${process.env.SERVER_URL}/cancel.html`,
      //item u r going to purchase
      line_items: req.body.items.map(item => {
        const storeItem = storeItems.get(item.id);
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: storeItem.name
            },
            unit_amount: storeItem .priceInCents
          },
          quantity: item.quantity,
        }
      }),
    });
    // console.log(line_items)
    // console.log(session.url)
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
    console.log(e.message)
  }
});

module.exports = router;

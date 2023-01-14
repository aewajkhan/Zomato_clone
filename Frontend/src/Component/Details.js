import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StripeCheckout from 'react-stripe-checkout';

const Details = () => {
  const params = useParams();
  console.log(params);

  const [restaurantDetail, setrestaurantDetails] = useState({});
  console.log(restaurantDetail);

  useEffect(() => {
    fetch("http://localhost:3500/restuarants/getAll")
      .then((res) => res.json())
      .then((Detail) => {
        // console.log(Detail.data)
        Detail.data.filter((restaurant) => {
          if (restaurant.restuarant_id === params.restuarant_id) {
            setrestaurantDetails(restaurant);
          }
        });
      });
  }, []);

  // function paymentmode(){
  //   fetch("http://localhost:3500/restuarants/getAll")
  //     .then((res) => res.json())
  //     .then((Detail) => {
  //       // console.log(Detail.data)
  //       Detail.data.filter((restaurant) => {
  //         if (restaurant.restuarant_id === params.restuarant_id) {
  //           setrestaurantDetails(restaurant);
  //         }
  //       });
  //     });
   

  // }
  const resl = {
    par : params.resturant_id,
}

  const payment = token =>{
    fetch('http://localhost:3500/payment/create-checkout-session',{
      method:'POST',
      headers:{
         'Content-Type':'Application/json',
      },
      body:JSON.stringify(resl)
   })
   .then(res=>res.json())
   .then(data=>console.log(data))
  }

  return (
    <div>
      <div className="px-5 col-6 mt-5">
        <img
          src={"http://localhost:3500/images/" + restaurantDetail.image}
          height="400"
        ></img>
      </div>
      <div className="row justify-content-around my-5">
        <h1 className="col-6 " style={{marginRight:"40%",color:"Green"}}>{restaurantDetail.restuarant_name}</h1>
        {/* <button
          className="btn btn-danger col-1 mx-5"
          style={{ width: "250px" }}
          onClick={paymentmode}
        >
          Order now! {restaurantDetail.cost} INR
        </button> */}
        <StripeCheckout stripeKey="pk_test_51M1C0ISJXNwU3E4gCRMainFzVIE7PujBAlizNIKyA9EDQTzP1Foffq0vn8GgJwKf0g0owfnx5mWGsH9YkN8Kp8lJ00GzuKipoA"
                 token={payment} name="Buying" description={restaurantDetail.cost} amount={restaurantDetail.cost} billingAddress shippingAddress>
                            <div className="col-6 " style={{width:"180px",marginLeft:"10%"}} >
                            <button className='btn btn-primary'>Place Order {restaurantDetail.cost} INR</button>
                            </div>
                    </StripeCheckout>
      </div>
      <div className="information ps-5">
        <div className="information d-flex gap-5 mx-4">
          <details className="details1">
            <summary className="fw-bold overview">
              <u>Overview</u>
            </summary>
            <br />
            <p className="fw-bold">
              About this place {restaurantDetail.cuisine}
            </p>

            <p className="fw-bold">Cuisine:{restaurantDetail.cuisine}</p>

            <p className="fw-bold d-inline">Average cost</p>
            <p>INR {restaurantDetail.cost} for two people(approx....)</p>
          </details>
          <details className="details2">
            <summary className="fw-bold contact">
              <u>Contact</u>
            </summary>
            <br />
            <p className="fw-bold d-inline">Call</p>
            <p className="fw-bold">7867543902</p>
            <p className="fw-bold d-inline">Address</p>
            <p>{restaurantDetail.Address}</p>
          </details>
        </div>
      </div>
    </div>
  );
};
export default Details;

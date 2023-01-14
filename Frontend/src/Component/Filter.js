import { Component } from "react";
import React,{useState} from "react";
import StripeCheckout from 'react-stripe-checkout';

import "../Styles/Filter.css";
const arr=[1,2,3,4,5];
//1.Mounting    2.Updating     3. Unmounting



class Filter extends Component {
  // const [pageArr, setPageArr] = useState(arr.slice(0, 3))
  // const [currPage, setCurrPage] = useState(1);
  //first function that will be called on mounting phase.
  constructor(props) {
    super(props); ///calls the parent class
    this.state = {
      //class component way of using usestate
      restaurantList: [],
      locations: [],
      filterChange: false,
      filterParams:'',
      pageArr:arr.slice(0, 3),
      currPage:1,
      lastPage:7,
      rowlimit:5,
      pageNumber:[1,2],
      perpage:[]
      // addCard:false
    };
  }

  componentDidMount() {
    
    // equivalent tpo function components hook useEffect
    this.locationFetch();
    // this.addTocard();
  }

  // addTocard(){
  //   fetch("http://localhost:3500/payment/create-checkout-session/",
  //   method: "POST",
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     {

  //     }
  //   })
  //   )
  
  //     .then((res) => res.json())
  //     .then((restaurantList) => this.setState({ restaurantList: restaurantList.data }));
  // }

  locationFetch() {
    fetch("http://localhost:3500/locations/Rlocations")
      .then((res) => res.json())
      .then((locations) => this.setState({ locations: locations.data }));
  }


  filterList() {
    console.log("filter list");
    let filterParams = "";
    const location = document.querySelector(
      "select[name=filter-location]"
    ).value;
    // console.log(location);

    const cuisine = document.querySelectorAll("input[name=cuisine]:checked");

    const cost = document.querySelectorAll("input[name=cost]:checked");

    const sort = document.querySelectorAll("input[name=sort]:checked");

    // console.log('Location of Restaurant '+ location);
    // console.log(cuisine)
    // console.log(cost)

    // console.log(sort)
    if (location) {
      filterParams += "location=" + location + "&";
    }

    if (cuisine && cuisine.length) {
      let cuisineIds = [];
      //will take all the ids from the selected checkboxes and puts it in the cuisineIds.
      cuisine.forEach((cuisin) => {
        cuisineIds.push(cuisin.id);
      });
      filterParams += "cuisine=" + cuisineIds.join(",") + "&";
    }

    if (sort.length) {
      //we know that this is a radiogroup and can have only 1 value at a time . so we can always be sure that the array size
      filterParams += "sort=" + sort[0].id + "&";
    }
    if (cost.length) {
      //we know that this is a radiogroup and can have only 1 value at a time . so we can always be sure that the array size will be 1.
      filterParams += "cost=" + cost[0].id;
      console.log(filterParams);


      this.setState({
        filterParams:filterParams
      });
      fetch('http://localhost:3500/restuarants/getAll?'+filterParams)
      .then(res=>res.json())
      .then(restaurants=>{
        this.setState({
          filterParams:false,
          restaurantList:restaurants.data
        })
      });
    }
  }

  componentDidUpdate(priviousProps, previousState) {
    // debugger;
    if (this.state.filterChange) {
      //filterChange will be true if Apply button is clicked (filter needs tobe done)
      if (previousState.filterChange !== this.state.filterChange) {
        //if the earlier filterchange was false ,then u get the filterList
        this.filterList();
      }
    }
  }

  //will be called everytime is a change in props or stATE
  shouldComponentUpdate(previousProps, previousState) {
    if (previousProps.age !== this.props.age) {
      //age value has changed
      return false; //will not re-render, which means it will not call componentDidUpdate
    } else {
      return true;
    }
  }

  // //is the component going to get unmounted?
  componentWillUnmount() {}

  render() {
    const updateFilter = () => {
      this.setState({
        filterChange: true,
      });
    };
    const addTocard=()=>{
      this.setState({
        addCard:true,
      });
    };
//pagination....
// componentDidUpdate(Preprops,Prestate,Snapshot){
//   console.log("ComponentDidUpdate",Preprops.name,Prestate.count,this.state.count)
//   if(this.state.count<10){
//       this.setState({count:this.state.count+1})
  
//   }
// }

// function handlechange(e){

//   this.setState({rowlimit:e.target.value})
// }

const onNextPress = () => {
  // console.log(this.state.currPage , this.state.lastPage)
  if (this.state.currPage < this.state.lastPage) {
    this.setState({currPage:this.state.currPage+ parseInt(1)})
    // this.setState(this.state.CurrPage+ 1);
    this.filterList(this.state.currPage + 1, this.state.rowlimit);
  }
};
console.log(this.state.currPage)

const onPrevPress = () => {
  // console.log(this.state.currPage , this.state.lastPage)

  if (this.state.currPage > this.state.lastPage) {
    this.setState({currPage:this.state.currPage-parseInt(1)})
    this.filterList(this.state.currPage - 1, this.state.rowlimit);

    // apiCall(currPage - 1, rowlimit);
    
  }
};
console.log(this.state.currPage)
// this.state
let disableIndex
// this.state
let pArr = [...Array(this.state.pageArr.length + 1).keys()].slice(1);

  if (
    this.state.currPage > 1 &&
    this.state.currPage % 4 === 0 &&
    this.state.currPage <= this.state.pArr?.length - 2

  )
{
    pArr = pArr.slice(this.state.currPage - 1, this.state.currPage + 2);
  } else if (
    this.state.currPage > 1 &&
    this.state.pArr?.length > 2 &&
    this.state.currPage > this.state.pArr?.length - 2
  ) {
    pArr = pArr.slice(pArr?.length - 3, pArr?.length);
  }
else {
    pArr = pArr.slice(  this.state.currPage-1,  this.state.currPage+ 2);
    if (this.state.pageArr?.length === 1 || this.state.pageArr?.length === 2) {
      pArr = [1, 2, 3];
      disableIndex = this.state.pageArr?.length === 1 ? [2, 3] : [3];

    }
    
  }
//   const resl = {
//     par : params.resturant_id,
// }

  const payment = token =>{
    fetch('http://localhost:3500/payment/create-checkout-session',{
      method:'POST',
      headers:{
         'Content-Type':'Application/json',
      },
      body:JSON.stringify("")
   })
   .then(res=>res.json())
   .then(data=>console.log(data))
  }

  const pagemove = (page)=>{
    console.log(page,"page");

   
    if(page === 1){
      this.setState({perpage:this.state.restaurantList.slice(0,2)});
     
    }

    if(page === 2){
      this.setState({perpage:this.state.restaurantList.slice(2,4)});
     
    }
  }

    return (
 
      <div className="row">
        <div className="filter col-3 my-5 ms-5 ">
          <label>Select Location</label>
          <select name="filter-location">
            {this.state.locations.map((location) => (
              <option value={location.location_id} key={location.location_id}>
                {location.location_name}
              </option>
            ))}
          </select>
          <hr />

          <label>Cuisines</label>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              name="cuisine"
              id="1"
            />
            <label htmlFor="1" className="form-check-label">
              North Indian
            </label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              name="cuisine"
              id="2"
            />
            <label htmlFor="2" className="form-check-label">
              South Indian
            </label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              name="cuisine"
              id="3"
            />
            <label htmlFor="3" className="form-check-label">
              Fast Food
            </label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              name="cuisine"
              id="4"
            />
            <label htmlFor="4" className="form-check-label">
              Any FOod
            </label>
          </div>
          <hr />

          <label>Cost</label>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              name="cost"
              id="gt"
            />
            <label htmlFor="" className="form-check-label">
              Greater than 500
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              name="cost"
              id="lt"
            />
            <label htmlFor="" className="form-check-label">
              Less than 500
            </label>
          </div>

          <hr />
          <label>Sort By</label>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              name="sort"
              id="hl"
            />
            <label htmlFor="" className="form-check-label">
              Prices high to low
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              name="sort"
              id="lh"
            />
            <label htmlFor="" className="form-check-label">
              Prices low to high
            </label>
          </div>

          <hr />
          <button onClick={updateFilter}>Apply</button>
        </div>
        <div  className="col-8">{
                this.state.perpage.length>0?<div className="results col-md-6 col-sm-8  my-5 ms-5">
                {this.state.perpage.map(card=>(
                  <div className="card " key={card.restuarant_id}>
                     <img src={"http://localhost:3500/images/"+card.image} className="card-img"></img>
                    <div className="card-title">
                      <h4>{card.restuarant_name}</h4>
                    </div>
                    <div className="cost-range ">
                    <h4>Cost: {card.cost} INR</h4>
                    </div>
                    <div className="rating-range">
                    <h4>Rating:{card.rating}*</h4>
                    {/* <h5>{card.image}</h5> */}
                    </div>
                    {/* <button className="btn btn-primary col-8 item-center" onClick={addTocard}>Place Your Order</button> */}
                    <StripeCheckout stripeKey="pk_test_51M1C0ISJXNwU3E4gCRMainFzVIE7PujBAlizNIKyA9EDQTzP1Foffq0vn8GgJwKf0g0owfnx5mWGsH9YkN8Kp8lJ00GzuKipoA"
                       token={payment} name="Buying" description={card.cost} amount={card.cost} billingAddress shippingAddress>
                                  <button className='btn btn-primary'>Place Order</button>
                          </StripeCheckout>
                  </div>
                ))}
              </div>
          :
        <div className="results col-md-6 col-sm-8  my-5 ms-5">
          {this.state.restaurantList.map(card=>(
            <div className="card " key={card.restuarant_id}>
               <img src={"http://localhost:3500/images/"+card.image} className="card-img"></img>
              <div className="card-title">
                <h4>{card.restuarant_name}</h4>
              </div>
              <div className="cost-range ">
              <h4>Cost: {card.cost} INR</h4>
              </div>
              <div className="rating-range">
              <h4>Rating:{card.rating}*</h4>
              {/* <h5>{card.image}</h5> */}
              </div>
              {/* <button className="btn btn-primary col-8 item-center" onClick={addTocard}>Place Your Order</button> */}
              <StripeCheckout stripeKey="pk_test_51M1C0ISJXNwU3E4gCRMainFzVIE7PujBAlizNIKyA9EDQTzP1Foffq0vn8GgJwKf0g0owfnx5mWGsH9YkN8Kp8lJ00GzuKipoA"
                 token={payment} name="Buying" description={card.cost} amount={card.cost} billingAddress shippingAddress>
                            <button className='btn btn-primary'>Place Order {card.cost} INR</button>
                    </StripeCheckout>
            </div>
          ))}
        </div>
  }
        </div>
        {/* pagination */}
       <div>
               <center>
                            {
                               this.state.pageNumber.map(page =>(
                                <button  className='btn btn-primary col-1' key={page} onClick={()=>pagemove(page)}>{page}</button>
                               ))
                            }
                     </center>
       </div>
      </div>
    );
  }
}
export default Filter;

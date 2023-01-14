import { useState } from "react";
import { useEffect } from "react";
import "../Styles/Wallpaper.css";

const Wallpaper = () => {
  const [locations, setLocations] = useState([]);
  const [restuarants, setRestaurants] = useState([]);

  const locationFetch = () => {
    fetch("http://localhost:3500/locations/Rlocations")
      .then((res) => res.json())
      .then((locations) => setLocations(locations.data));
  };

  const onLocationChange=(event)=>{
        // console.log(event.target.value);
        let currentLocation =event.target.value;
        fetch('http://localhost:3500/restuarants/get?location='+currentLocation)
        .then(res=>res.json())
        .then((restaurants)=> setRestaurants(restaurants.data))
  };

  const onRestaurantChnage= (event)=>{
    let currentRestaurant= event.target.value;
    window.location.href=window.location.origin+'/restuarants/'+ currentRestaurant;
  }

  useEffect(() => {
    locationFetch();
  }, []);
  return (
    <div className="container-fluid back-img">
      <div className="logo-row row text-center pt-5">
        <div className="col-12">
          <p className="logo px-4 py-3 px-md-4 py-md-2">Zomato</p>
        </div>
      </div>
      <div className="restaurant-title-row text-center pt-5">
        <div className="col-12">
          <p className="restaurant-title px-4 py-3 px-md-4 py-md-2">
            Find the best restaurant, cafes and bars!
          </p>
        </div>
      </div>
      <div className="search bar row texr-center pt-5">
        <div className="col-12 col-sm-12 col-md-1 col-lg-2 col-xl-2"></div>
        <div className="col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3 mb-4">
          <div className="locationSelector">
            <select className="locationDropdown px-2 py-3" defaultValue={""} onChange={onLocationChange}>
              <option value="" disabled>
                please select a location
              </option>
              {locations.map(loc=>(
                  <option value={loc.location_id} key={loc.location_id}>
                    {loc.location_name}
                  </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5">
          <div className="restauranSelector">
            <select className="restaurantDropdown px-2 py-3" defaultValue={""} onChange={onRestaurantChnage}>
              <option value="" disabled>
                please select a restaurant
              </option>
              {restuarants.map(rest=>(
                  <option value={rest.restuarant_id
                  } key={rest.restuarant_id}>
                    {rest.restuarant_name}
                  </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallpaper;

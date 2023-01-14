import { Component } from "react";
import "../Styles/Quicksearches.css";
class Quicksearches extends Component {
  cardDetails() {
    const cards = [
      {
        title: "breakfast",
        image: "breakfast.png",
        description: "Start your day with exclusive breakfast options",
      },
      {
        title: "Lunch",
        image: "Lunch.png",
        description: "Start your day with exclusive Lunch options",
      },
      {
        title: "Snacks",
        image: "Snacks.png",
        description: "Start your day with exclusive Snacks options",
      },
      {
        title: "Dinner",
        image: "Dinner.png",
        description: "Start your day with exclusive Dinner options",
      },
      {
        title: "Drinks",
        image: "Drinks.png",
        description: "Start your day with exclusive Drinks options",
      },
      {
        title: "Night-life",
        image: "NightLife.png",
        description: "Start your day with exclusive Night-life options",
      },
    ];
    return cards;
  }
  render() {
    const cards = this.cardDetails();
    return (
      <div className="container">
        <div className="quick-searches mt-4 ms-4">Quick searches</div>
        <div className="quick-search-subtittle mt-3 ms-4 ">
          Discover restaurants by type of meal
        </div>
        <div className="row mt-3 ">
          {cards.map((card) => (
            <div className="card col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4 my-3 mx-auto text-center">
              <div className="row">
                <div className="col-6 px-0 mx-0">
                  <img 
                    src={require("../Assets/" + card.image)}
                    className="card-img"
                  ></img>
                </div>
                <div className="col-6 px-3 py-3">
                  <div className="card-title">{card.title}</div>
                  <div className="card-description">{card.description}</div>
                <a href="/filter" class="btn btn-primary stretched-link">More...</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Quicksearches;

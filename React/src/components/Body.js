import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [searchText, setsearchText] = useState("");
  // whenever state variables update, react triggers a reconciliation cycle(re-renders the component)
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await res.json();
    console.log("✅ Full API response:", json);

    let restaurantCards = [];

    json.data.cards.forEach((card) => {
      const innerCard = card?.card?.card;
      // Check if it contains restaurants inside gridElements
      if (innerCard?.gridElements?.infoWithStyle?.restaurants) {
        restaurantCards = innerCard.gridElements.infoWithStyle.restaurants;
      }
    });

    console.log("✅ Parsed Restaurant List:", restaurantCards);
    setListOfRestaurants(restaurantCards);
    setAllRestaurants(restaurantCards);
  };
  // conditional rendering
  // if(listOfRestaurants.length == 0) {
  //   return <Shimmer />
  // }

  const filterTopRated = () => {
    const filtered = allRestaurants.filter((res) => res.info?.avgRating > 4.5);
    setListOfRestaurants(filtered);
  };

  // Optional loading text
  // if (listOfRestaurants.length === 0) return <h2>Loading restaurants...</h2>;

  return listOfRestaurants.length == 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="search"
            className="search-box"
            value={searchText}
            onChange={(e) => {
              setsearchText(e.target.value);
            }}
          />
          <button
            onClick={() => {
              const filteredRestaurant = allRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setListOfRestaurants(filteredRestaurant);
            }}
          >
            Search
          </button>
        </div>
        <button className="filter-btn" onClick={filterTopRated}>
          Top Rated Restaurants
        </button>
      </div>

      <div className="res-container">
        {listOfRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.info.id} resData={restaurant.info} />
        ))}
      </div>
    </div>
  );
};

export default Body;

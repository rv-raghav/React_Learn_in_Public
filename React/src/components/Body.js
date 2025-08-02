import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.471113686461567&lng=77.31343735009432&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await res.json();

    const restaurants =
      json?.data?.cards?.[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants || [];

    setListOfRestaurants(restaurants);
    setFilteredRestaurants(restaurants);
  };

  const filterTopRated = () => {
    const filteredList = listOfRestaurants.filter(
      (res) => Number(res.info.avgRating) > 4
    );
    setFilteredRestaurants(filteredList);
  };

  const onlineStatus = useOnlineStatus();

  if(onlineStatus === false) return <h1>Looks like u are offline check your internet connection</h1>
  return filteredRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="search"
            className="search-box"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            onClick={() => {
              const filteredList = listOfRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredRestaurants(filteredList);
            }}
          >
            Search
          </button>
        </div>

        <button className="filter-btn" onClick={filterTopRated}>
          Top Rated Restaurants
        </button>

        <button
          className="filter-btn"
          onClick={() => setFilteredRestaurants(listOfRestaurants)}
        >
          Show All
        </button>
      </div>

      <div className="res-container">
        {filteredRestaurants.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={"/restaurants/" + restaurant.info.id}
          >
            <RestaurantCard resData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;

import { useEffect, useState } from "react";
import RestaurantCard, {withPromotedLabel} from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  
  // const RestaurantCardPromoted = withPromotedLabel(RestaurantCard)
  console.log("Body rendered",listOfRestaurants)
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

  if (onlineStatus === false)
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <h1 className="text-red-600 text-xl font-semibold text-center px-4">
          Looks like you are offline. Please check your internet connection.
        </h1>
      </div>
    );

  return filteredRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      {/* Filter & Search Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        {/* Search Box */}
        <div className="flex flex-1 max-w-xl mx-auto sm:mx-0">
          <input
            type="search"
            className="flex-grow border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            placeholder="Search restaurants..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="bg-pink-500 hover:bg-pink-600 text-white px-5 rounded-r-md transition"
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

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
          <button
            className="bg-pink-500 text-white px-4 py-2 rounded-md transition hover:bg-pink-600 shadow"
            onClick={filterTopRated}
          >
            Top Rated Restaurants
          </button>
          <button
            className="bg-gray-200 px-4 py-2 rounded-md transition hover:bg-gray-300"
            onClick={() => setFilteredRestaurants(listOfRestaurants)}
          >
            Show All
          </button>
        </div>
      </div>

      {/* Restaurants List */}
      <div className="flex flex-wrap gap-6 justify-center">
        {filteredRestaurants.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={"/restaurants/" + restaurant.info.id}
            className="hover:scale-105 transition-transform"
          >
            {/* {{Render promoted lable if restaurant is promoted}}
            restaurant.data.promoted ? <RestaurantCardPromoted resData={restaurant} /> : <RestaurantCard resData={restaurant} />
            } */}
            <RestaurantCard resData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;

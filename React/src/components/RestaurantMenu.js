import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";

const RestaurantMenu = () => {
  const { resId } = useParams();
  
  //custom hooks
  const resInfo = useRestaurantMenu(resId);

  if (!resInfo) return <Shimmer />;

  const { name, cuisines, costForTwo } = resInfo?.cards[2]?.card?.card?.info;
  const { itemCards } =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card;
  console.log(resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards)
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Restaurant header */}
      <div className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{name}</h1>
        <h3 className="text-sm text-gray-600 mb-1">
          {cuisines.join(", ")}
        </h3>
        <h3 className="text-sm text-pink-600 font-semibold">
          Average Cost: ₹{costForTwo / 100}
        </h3>
      </div>

      {/* Menu items */}
      <ul className="space-y-4">
        {itemCards.map((item) => {
          const { id, name, price } = item.card.info;
          const displayPrice =
            price !== undefined ? (price / 100).toFixed(2) : "N/A";

          return (
            <li
              key={id}
              className="p-4 border rounded-lg shadow-sm hover:shadow-md transition flex justify-between items-center"
            >
              <span className="font-medium text-gray-800">{name}</span>
              <span className="text-gray-600 font-semibold">₹{displayPrice}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RestaurantMenu;

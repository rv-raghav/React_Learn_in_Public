import { CDN_URL } from "../utils/constants";

const RestaurantCard = ({ resData }) => {
  const { cloudinaryImageId, name, avgRating, cuisines, costForTwo, sla } =
    resData?.info;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition p-5 w-72 m-4 flex flex-col items-center">
      <img
        className="w-56 h-40 object-cover rounded-md mb-4"
        alt={name}
        src={CDN_URL + cloudinaryImageId}
      />
      <div className="w-full flex flex-col gap-1">
        <h3 className="text-lg font-semibold text-gray-900 truncate" title={name}>{name}</h3>
        <h4 className="text-sm text-gray-600 truncate">{cuisines.join(", ")}</h4>
        <div className="flex items-center text-sm mt-1">
          <span className={`px-2 py-0.5 rounded text-xs font-bold mr-2 ${avgRating >= 4 ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
            {avgRating} ★
          </span>
          <span className="text-gray-500">{costForTwo}</span>
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>
            ⏱ {sla?.deliveryTime ?? "NA"} min
          </span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;

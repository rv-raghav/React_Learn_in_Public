import { CDN_URL } from "../utils/constants";

// using props
const RestaurantCard = ({ resData }) => {
  const { name, cuisines, cloudinaryImageId, avgRating, costForTwo, sla } =
    resData;

  return (
    <div className="res-card">
      <img className="res-logo" alt={name} src={CDN_URL + cloudinaryImageId} />
      <h3>{name}</h3>
      <h4>{cuisines?.join(", ")}</h4>
      <h4>⭐ {avgRating}</h4>
      <h4>{costForTwo}</h4>
      <h4>{sla?.slaString || `${sla?.deliveryTime} mins`}</h4>
    </div>
  );
};

export default RestaurantCard;

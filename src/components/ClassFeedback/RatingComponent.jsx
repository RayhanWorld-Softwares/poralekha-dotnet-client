import ReactStars from "react-rating-stars-component";

function RatingComponent({ star }) {
  return <ReactStars count={star} size={24} activeColor="#ffd700" />;
}

export default RatingComponent;

import { Link } from "react-router-dom";

const Card = ({ favorite, deleteHandler }) => {
  return (
    <div>
      <h3>{favorite.title}</h3>
      <button onClick={deleteHandler}>delete</button>
      <Link to={`/favorites/${favorite._id}`}>edit</Link>
    </div>
  );
};

export default Card;

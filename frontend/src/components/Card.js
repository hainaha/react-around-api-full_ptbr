import { CreateUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

function Card(props) {
  const currentUser = useContext(CreateUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = isOwn
    ? "card__delete-icon"
    : "card__delete-icon_hidden";
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `like-button ${
    isLiked && "like-button_active"
  }`;
  const cardLikesClassName = `card__likes ${isLiked && "card__likes_active"}`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <>
      <div className="card">
        <button
          className={cardDeleteButtonClassName}
          type="submit"
          onClick={handleDeleteClick}
        ></button>
        <img
          src={props.card.link}
          className="card__image"
          alt={props.card.name}
          onClick={handleClick}
        />
        <div className="card__title-container">
          <h2 className="card__title">{props.card.name}</h2>
          <div className="card__like-container">
            <button
              className={cardLikeButtonClassName}
              type="button"
              onClick={handleLikeClick}
            ></button>
            <p className={cardLikesClassName}>{props.card.likes.length}</p>
            <p className="card__id">{props.card._id}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;

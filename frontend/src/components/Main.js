import { useContext } from "react";
import Card from "./Card";
import { CreateUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = useContext(CreateUserContext);

  return (
    <>
      <main>
        <div className="profile">
          <div className="profile__avatar-container">
            <img
              src={currentUser.avatar}
              className="profile__avatar"
              alt="Foto do perfil"
            />
            <button
              className="avatar-button"
              type="button"
              onClick={props.onEditAvatarClick}
            ></button>
          </div>
          <div className="profile__title-container">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              className="edit-button"
              type="button"
              onClick={props.onEditProfileClick}
            ></button>
            <p className="profile__subtitle">{currentUser.about}</p>
            <p className="profile__id">{currentUser._id}</p>
          </div>
          <button
            className="add-button"
            type="button"
            onClick={props.onAddPlaceClick}
          >
            +
          </button>
        </div>
        <section className="content">
          {props.cards.map((card) => (
            <>
              <Card
                card={card}
                key={card._id}
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
              />
            </>
          ))}
        </section>
      </main>
    </>
  );
}

export default Main;

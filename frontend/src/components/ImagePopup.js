function ImagePopup(props) {
  return (
    <>
      <div
        className={`popup popup_image ` + (props.isOpen ? "popup_opened" : "")}
      >
        <div className="popup__container popup__container_image">
          <img
            src={props.card.link}
            alt={props.card.name}
            className="popup__expanded-image"
          />
          <p className="popup__place-name">{props.card.name}</p>
          <button
            className="popup__close"
            type="button"
            onClick={props.onClose}
          ></button>
        </div>
      </div>
    </>
  );
}

export default ImagePopup;

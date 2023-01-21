import { useRef, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [placeName, setPlaceName] = useState("");
  const [imageLink, setImageLink] = useState("");
  const cardTitleInput = useRef();
  const cardTitleError = useRef();
  const cardImageInput = useRef();
  const cardImageError = useRef();
  const [nameIsValid, setNameIsValid] = useState(false);
  const [imageIsValid, setImageIsValid] = useState(false);

  function handlePlaceNameChange(e) {
    setPlaceName(e.target.value);
    setNameIsValid(props.enableValidation(e, cardTitleInput, cardTitleError));
  }

  function handleImageLinkChange(e) {
    setImageLink(e.target.value);
    setImageIsValid(props.enableValidation(e, cardImageInput, cardImageError));
  }

  const isFormValid = nameIsValid && imageIsValid;

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlaceSubmit({ placeName, imageLink });
    resetForm();
  }

  function handleClose() {
    props.onClose();
    resetForm();
    props.resetValidation(cardTitleInput, cardTitleError);
    props.resetValidation(cardImageInput, cardImageError);
  }

  function resetForm() {
    setPlaceName("");
    setImageLink("");
    setNameIsValid(false);
    setImageIsValid(false);
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={handleClose}
      title={"Novo local"}
      name={"addCard"}
      textButton={"Salvar"}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
    >
      <input
        type="text"
        name="name"
        placeholder="Titulo"
        className="popup__input"
        id="card-title"
        required
        minLength="2"
        maxLength="30"
        value={placeName}
        onChange={handlePlaceNameChange}
        ref={cardTitleInput}
      />
      <span ref={cardTitleError}></span>
      <input
        type="url"
        name="link"
        placeholder="Link da imagem"
        className="popup__input"
        id="card-image"
        value={imageLink}
        onChange={handleImageLinkChange}
        ref={cardImageInput}
        required
      />
      <span ref={cardImageError}></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;

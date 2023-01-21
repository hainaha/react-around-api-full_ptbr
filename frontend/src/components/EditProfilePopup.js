import { useState, useContext, useEffect, useRef } from "react";
import { CreateUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
  const currentUser = useContext(CreateUserContext);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const profileNameInput = useRef();
  const profileNameError = useRef();
  const profileAboutInput = useRef();
  const profileAboutError = useRef();
  const [profileNameIsValid, setProfileNameIsValid] = useState(true);
  const [profileAboutIsValid, setProfileAboutIsValid] = useState(true);

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
    setProfileNameIsValid(
      props.enableValidation(e, profileNameInput, profileNameError)
    );
  }

  function handleAboutChange(e) {
    setAbout(e.target.value);
    setProfileAboutIsValid(
      props.enableValidation(e, profileAboutInput, profileAboutError)
    );
  }

  const isFormValid = profileNameIsValid && profileAboutIsValid;

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about,
    });
  }

  function handleClose() {
    props.onClose();
    setName(currentUser.name);
    setAbout(currentUser.about);
    props.resetValidation(profileNameInput, profileNameError);
    props.resetValidation(profileAboutInput, profileAboutError);
    setProfileNameIsValid(true);
    setProfileAboutIsValid(true);
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={handleClose}
      title={"Editar perfil"}
      name={"edit-profile"}
      textButton={"Salvar"}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
    >
      <input
        type="text"
        name="name"
        placeholder="Nome"
        className="popup__input"
        id="input-name"
        required
        minLength="2"
        maxLength="40"
        value={name}
        onChange={handleNameChange}
        ref={profileNameInput}
      />
      <span ref={profileNameError}></span>
      <input
        type="text"
        name="about"
        placeholder="Sobre mim"
        className="popup__input"
        id="input-about"
        required
        minLength="2"
        maxLength="200"
        value={about}
        onChange={handleAboutChange}
        ref={profileAboutInput}
      />
      <span ref={profileAboutError}></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;

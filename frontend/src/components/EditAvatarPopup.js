import { useState, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const [url, setUrl] = useState("");
  const avatarRef = useRef();
  const avatarImageError = useRef();
  const [avatarIsValid, setAvatarIsValid] = useState(false);

  function handleUrlChange(e) {
    setUrl(e.target.value);
    setAvatarIsValid(props.enableValidation(e, avatarRef, avatarImageError));
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(avatarRef.current.value);
    resetForm();
  }

  function handleClose() {
    props.onClose();
    resetForm();
    props.resetValidation(avatarRef, avatarImageError);
  }

  function resetForm() {
    setUrl("");
    setAvatarIsValid(false);
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={handleClose}
      title={"Alterar a foto do perfil"}
      name={"edit-avatar"}
      textButton={"Salvar"}
      onSubmit={handleSubmit}
      isFormValid={avatarIsValid}
    >
      <input
        type="url"
        name="avatar"
        placeholder="Link da imagem"
        className="popup__input"
        id="avatar-image"
        value={url}
        onChange={handleUrlChange}
        ref={avatarRef}
        required
      />
      <span ref={avatarImageError}></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;

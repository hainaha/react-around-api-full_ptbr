import PopupWithForm from "./PopupWithForm";

function ConfirmDeletePopup(props) {
  const isFormValid = true;

  function handleSubmit(e) {
    e.preventDefault();
    props.onDeleteSubmit(props.card);
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      title={"Tem certeza?"}
      name={"deleteCard"}
      textButton={"Sim"}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
    ></PopupWithForm>
  );
}

export default ConfirmDeletePopup;

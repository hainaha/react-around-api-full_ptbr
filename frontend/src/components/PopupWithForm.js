function PopupWithForm(props) {
  return (
    <>
      <div
        className={
          `popup popup_type_${props.name} ` +
          (props.isOpen ? "popup_opened" : "")
        }
      >
        <form
          className="popup__form"
          id={props.name}
          name={props.name}
          noValidate
          onSubmit={props.onSubmit}
        >
          <div className="popup__container">
            <p className="popup__title">{props.title}</p>
            {props.children}
            <button
              className={
                props.isFormValid
                  ? "popup__button"
                  : "popup__button popup__button_disabled"
              }
              type="submit"
              disabled={!props.isFormValid}
            >
              {props.textButton}
            </button>
            <button
              className="popup__close"
              type="button"
              onClick={props.onClose}
            ></button>
          </div>
        </form>
      </div>
    </>
  );
}

export default PopupWithForm;

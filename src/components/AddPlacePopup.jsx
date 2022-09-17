import React from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({ isOpen, onClose, onAddPlace }) => {
  const placeNameRef = React.useRef();
  const placeLinkRef = React.useRef();

  React.useEffect(() => {
    placeNameRef.current.value = "";
    placeLinkRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace(placeNameRef.current.value, placeLinkRef.current.value);
  }
  return (
    <PopupWithForm
      title="Новое место"
      name="add-card"
      container="popup__container-add-card"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <input
        className="form__container form__container_type_inf"
        name="name"
        id="info"
        type="text"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        ref={placeNameRef}
        required
      />
      <span className="error" id="info-error"></span>
      <input
        className="form__container form__container_type_src"
        name="link"
        id="link"
        type="url"
        placeholder="Ссылка на картинку"
        ref={placeLinkRef}
        required
      />
      <span className="error" id="link-error"></span>
    </PopupWithForm>
  );
};

export default AddPlacePopup;

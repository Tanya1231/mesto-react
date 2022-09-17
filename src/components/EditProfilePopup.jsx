import React from "react";
import PopupWithForm from "./PopupWithForm";

const EditProfilePopup = props => {
  const profileNameRef = React.useRef();
  const profileAboutRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateProfile(
      profileNameRef.current.value,
      profileAboutRef.current.value
    );
    profileNameRef.current.value = "";
    profileAboutRef.current.value = "";
  }
  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      title=" Редактировать профиль"
      name="profile"
      container="popup__container-profile"
      buttonText="Сохранить"
    >
      <input
        className="form__container form__container_type_name"
        name="name"
        type="text"
        placeholder="Имя"
        id="name"
        minLength="2"
        maxLength="40"
        ref={profileNameRef}
        required
      />
      <span className="error" id="name-error"></span>
      <input
        className="form__container form__container_type_info"
        name="about"
        type="text"
        placeholder="О себе"
        id="about"
        minLength="2"
        maxLength="200"
        ref={profileAboutRef}
        required
      />
      <span className="error" id="about-error"></span>
    </PopupWithForm>
  );
};

export default EditProfilePopup;

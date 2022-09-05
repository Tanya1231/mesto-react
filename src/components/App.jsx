import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import React from "react";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(
    false
  );
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
    false
  );
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(null);
  const [selectedCard, setSelectedCard] = React.useState({});

  const handleCardClick = card => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const closeAllPopup = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
  };

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm
        title=" Редактировать профиль"
        name="profile"
        container="popup__container-profile"
        isOpen={isEditProfilePopupOpen}
        buttonText="Сохранить"
        onClose={closeAllPopup}
      >
        <input
          className="form__container form__container_type_name"
          name="name"
          type="text"
          placeholder="Имя"
          id="name"
          minLength="2"
          maxLength="40"
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
          required
        />
        <span className="error" id="about-error"></span>
      </PopupWithForm>
      <PopupWithForm
        title="Новое место"
        name="add-card"
        container="popup__container-add-card"
        onClose={closeAllPopup}
        isOpen={isAddPlacePopupOpen}
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
          required
        />
        <span className="error" id="info-error"></span>
        <input
          className="form__container form__container_type_src"
          name="link"
          id="link"
          type="url"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="error" id="link-error"></span>
      </PopupWithForm>
      <PopupWithForm
        title="Обновить аватар"
        name="avatar"
        container="popup__container-avatar"
        onClose={closeAllPopup}
        isOpen={isEditAvatarPopupOpen}
        buttonText="Сохранить"
      >
        <input
          className="form__container form__container_type_avatar"
          name="avatar"
          type="url"
          placeholder="https://somewebsite.com/someimage.jpg"
          id="avatar"
          required
        />
        <span className="error" id="avatar-error"></span>
      </PopupWithForm>
      <ImagePopup
        onClose={closeAllPopup}
        card={selectedCard}
        isOpen={isImagePopupOpen}
      />
    </div>
  );
}
export default App;

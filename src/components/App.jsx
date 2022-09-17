import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import React from "react";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import EditProfilePopup from "./EditProfilePopup";
import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

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
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getUserInfo()
      .then(data => {
        setCurrentUser(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then(cards => {
        setCards(cards);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

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

  const handleUpdateAvatar = avatar => {
    api
      .setUserAvatar(avatar)
      .then(data => {
        setCurrentUser(data);
        closeAllPopup();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleAddPlaceSubmit = (name, link) => {
    api
      .addCard(name, link)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopup();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleProfileSubmit = (name, about) => {
    api
      .editUserInfo(name, about)
      .then(data => {
        setCurrentUser(data);
        closeAllPopup();
      })
      .catch(err => {
        console.log(err);
      });
  };

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
} 
  function handleCardRemove(card)  {
    api.deleteCard(card._id)
    .then(() =>  {
      setCards(state => state.filter((c) => c._id !== card._id));
    })
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header />
          <Main
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardRemove={handleCardRemove}
          />
          <Footer />
          <AddPlacePopup
            onClose={closeAllPopup}
            isOpen={isAddPlacePopupOpen}
            onAddPlace={handleAddPlaceSubmit}
          />
          <EditProfilePopup
            onClose={closeAllPopup}
            isOpen={isEditProfilePopupOpen}
            onUpdateProfile={handleProfileSubmit}
          />
          <EditAvatarPopup
            onClose={closeAllPopup}
            isOpen={isEditAvatarPopupOpen}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <ImagePopup
            onClose={closeAllPopup}
            card={selectedCard}
            isOpen={isImagePopupOpen}
          />
        </div>
      </CurrentUserContext.Provider>
    </>
  );
}
export default App;

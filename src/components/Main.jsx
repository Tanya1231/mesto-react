import React, { useEffect } from "react";
import Card from "./Card";
import { api } from "../utils/api";

const Main = ({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) => {
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);

  useEffect(() => {
    api
      .getUserInfo()
      .then(res => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    api
      .getInitialCards()
      .then(cards => setCards(cards))
      .catch(err => console.log(err));
  }, []);

  return (
    <main className="main">
      <section className="profile">
        <img className="profile__avatar" src={userAvatar} alt="Аватар" />
        <button
          className="profile__avatar-edit"
          onClick={onEditAvatar}
        ></button>
        <div className="profile__info">
          <div className="profile__row">
            <h1 className="profile__title">{userName}</h1>
            <button
              className="profile__edit-button"
              type="button"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__subtitle">{userDescription}</p>
        </div>
        <button
          className="profile__addbutton"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>
      <template className="elements" id="card">
        {cards.map(card => {
          return (
            <Card
              key={card._id}
              likesCount={card.likes.length}
              onCardClick={onCardClick}
              name={card.name}
              link={card.link}
              card={card}
            />
          );
        })}
      </template>
    </main>
  );
};

export default Main;

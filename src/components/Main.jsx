import { Card } from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";
// import { api } from "../utils/Api";

export function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  cards,
  onCardDelete
}) {
  const userContext = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__info">
          <div className="profile__avatar-container">
            {/* Линк на аватар вставляется с помощью атрибута src */}
            {/* я не стал использовать код предложенный в брифе к проектной работе, так как он слишком громоздкий и ломает логику в моем проекте */}
            {/* в брифе предлагали использовать такой код: style={{ backgroundImage: `url(${userAvatar})` }} */}
            <img
              className="profile__avatar"
              src={userContext.avatar}
              alt="Аватар"
            />
            <button
              className="profile__avatar-button"
              type="button"
              onClick={onEditAvatar}
            />
          </div>
          <h2 className="profile__title">{userContext.name}</h2>
          <button
            className="profile__edit-button"
            type="button"
            aria-label="Кнопка редактирования"
            onClick={onEditProfile}
          />
          <p className="profile__subtitle">{userContext.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="кнопка добавить"
          onClick={onAddPlace}
        />
      </section>
      <section className="elements" aria-label="карточки">
        {cards.map((card) => {
          return (
            <Card
              onCardClick={onCardClick}
              key={card._id}
              card={card}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            ></Card>
          );
        })}
      </section>
    </main>
  );
}

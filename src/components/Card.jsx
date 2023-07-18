import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const userContext = useContext(CurrentUserContext);
  const handleClick = () => {
    onCardClick(card);
  };

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === userContext._id;
  // Создаём переменную, которую после зададим в `className` для кнопки мусорки
  const cardTrashButtonClassName = `element__trash-button ${
    isOwn && "element___trash-button_visibility_visible"
  }`;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === userContext._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__like-button ${
    isLiked && "element__like-button_active"
  }`;

  return (
    <div className="element" id="card">
      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />

      <button
        className={cardTrashButtonClassName}
        type="button"
        aria-label="кнопка мусорка"
        onClick={handleDeleteClick}
      />

      <div className="element__whitebox">
        <h2 className="element__title" name="name" id="title">
          {card.name}
        </h2>
        <div className="element__like-button-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="кнопка лайк"
            onClick={handleLikeClick}
          />
          <span className="element__like-button-counter">
            {card.likes.length}
          </span>
        </div>
      </div>
    </div>
  );
}

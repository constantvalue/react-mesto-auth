export function ImagePopup({ onClose, card }) {
  return (
    //логическим оператором "И" проверяем выполнение условий. В обратном случае получаем false.
    <div className={`popup popup-image ${card ? "popup_opened" : ""}`}>
      <div className="popup__image-box">
        <img src={card ? card.link : ""} className="popup__image" alt={card ? card.name : ""} />
        <h2 className="popup__image-heading">{card ? card.name : ""}</h2>
        <button
          className="popup__close-button popup__close-button_position_image-popup"
          type="button"
          aria-label="кнопка закрыть окно"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

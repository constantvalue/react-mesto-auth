export function InfoTooltip({ title, image, name, isOpen, onClose }) {
  return (
    //логическим оператором "И" проверяем выполнение условий. В обратном случае получаем false.
    <div className={`popup ${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__form">
        <img className="popup__infotooltip" src={image} alt={title} />
        <h2 className="popup__heading popup__heading_place_tooltip">{title}</h2>

        <button
          className="popup__close-button"
          type="button"
          aria-label="кнопка закрыть окно"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

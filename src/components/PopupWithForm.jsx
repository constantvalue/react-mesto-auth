export function PopupWithForm({
  title,
  name,
  buttonText,
  children,
  isOpen,
  onClose,
  onSubmit
}) {
  return (
    //логическим оператором "И" проверяем выполнение условий. В обратном случае получаем false.
    <div className={`popup ${name} ${isOpen ? "popup_opened" : ""}`}>
      <form className="popup__form" onSubmit={onSubmit} name={name} id="profileForm" noValidate="">
        <h2 className="popup__heading">{title}</h2>
        {children}
        <button
          className="popup__submit-button"
          type="submit"
          aria-label="кнопка сохранить"
        >
          {buttonText}
        </button>
        <button
          className="popup__close-button"
          type="button"
          aria-label="кнопка закрыть окно"
          onClick={onClose}
        />
      </form>
    </div>
  );
}

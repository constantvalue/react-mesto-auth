import { useRef } from "react";
import { PopupWithForm } from "./PopupWithForm";

export function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const editAvatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: editAvatarRef.current.value,
    });
  }



  return (
    <PopupWithForm
      name={"popup-avatar"}
      title={"Обновить аватар"}
      buttonText={"Сохранить"}

      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-container">
        <input
          ref={editAvatarRef}
          className="popup__input"
          type="url"
          id="popup-avatar-input-name"
          name="avatar"
          minLength={2}
          required
          placeholder="Ссылка на картинку"
        />
        <span className="popup-avatar-input-name-error" />
      </div>
    </PopupWithForm>
  );
}

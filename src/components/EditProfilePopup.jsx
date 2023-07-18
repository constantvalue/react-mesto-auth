import { PopupWithForm } from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext, useEffect, useState } from "react";

export function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");
  const [about, setDescription] = useState("");

  const userContext = useContext(CurrentUserContext);

  useEffect(() => {
    setName(userContext.name);
    setDescription(userContext.about);
  }, [isOpen, userContext]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about,
    });
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name={"popup-profile"}
      title={"Редактировать профиль"}
      buttonText={"Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="popup__input-container">
        <input
          className="popup__input"
          type="text"
          id="popup-profile-input-name"
          name="name"
          minLength={2}
          maxLength={40}
          required
          placeholder="Имя"
          //решение было найдено здесь https://stackoverflow.com/questions/47012169/a-component-is-changing-an-uncontrolled-input-of-type-text-to-be-controlled-erro
          value={name || ""}
          onChange={handleNameChange}
        />
        <span className="popup-profile-input-name-error" />
      </div>
      <div className="popup__input-container">
        <input
          className="popup__input"
          type="text"
          id="popup-profile-input-job"
          name="job"
          minLength={2}
          maxLength={200}
          required
          placeholder="Должность"
          //решение было найдено здесь https://stackoverflow.com/questions/47012169/a-component-is-changing-an-uncontrolled-input-of-type-text-to-be-controlled-erro
          value={about || ""}
          onChange={handleDescriptionChange}
        />
        <span className="popup-profile-input-job-error" />
      </div>
    </PopupWithForm>
  );
}

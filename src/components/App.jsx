import { Header } from "./Header";
import { Main } from "./Main";
import { Footer } from "./Footer";
import { ImagePopup } from "./ImagePopup";
import { useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/Api";
import { EditProfilePopup } from "./EditProfilePopup";
import { EditAvatarPopup } from "./EditAvatarPopup";
import { AddPlacePopup } from "./AddPlacePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  //используем хук для запроса данных.
  useEffect(() => {
    //этот код выполнится при монтировании компонента.
    api
      .getUserData()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((error) => {
        console.log(error);
      });
    //передаем пустой массив зависимостей
    //без этого будут бесконечные запросы.
  }, []);

  //используем хук для запроса данных.
  useEffect(() => {
    //этот код выполнится при монтировании компонента.
    api
      .getInitialCards()
      .then((res) => {
        // cardData.forEach((item) => {
        //   item.myId = userData._id;
        // });
        setCards(res);
      })
      .catch((error) => {
        console.log(error);
      });
    //передаем пустой массив зависимостей
    //без этого будут бесконечные запросы.
  }, []);

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  //эта функция будет вызываться на каждом компоненте с попапом. Служит для закрытия по клику на крестик.
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c === card ? newCard : c)));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleCardDelete(card) {
    api
      .cardDelete(card)
      .then(() => {
        setCards((state) => state.filter((c) => c !== card));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleUpdateUser(data) {
    api
      .userInfoPatch(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .updateAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleAddPlace(data) {
    api
      .addCardOnServer(data)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header></Header>
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          // пробросили хэндлер клика по карточке через пропсы компонентов  Main -> Card
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          cards={cards}
          onCardDelete={handleCardDelete}
        />
        <Footer></Footer>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <ImagePopup onClose={closeAllPopups} card={selectedCard}></ImagePopup>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;

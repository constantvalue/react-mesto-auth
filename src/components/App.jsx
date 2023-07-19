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
import { InfoTooltip } from "./InfoTooltip";
import { Register } from "./Register";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Login } from "./Login";
import * as auth from "../utils/auth";
import ProtectedRouteElement from "./ProtectedRoute";
import tooltipsuccess from "../images/tooltip-success.png";
import tooltipfail from "../images/tooltip-fail.png";

function App() {
  const [isInfotooltipPopupOpen, setIsInfotooltipPopupOpen] = useState(false);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const [isInfotooltipSuccessful, setIsInfotooltipSuccessful] = useState({
    image: "",
    heading: "",
  });

  function handleSuccess() {
    setIsInfotooltipSuccessful({
      image: tooltipsuccess,
      heading: "Вы успешно зарегистрировались!",
    });
  }

  function handleFail() {
    setIsInfotooltipSuccessful({
      image: tooltipfail,
      heading: "Что-то пошло не так! Попробуйте ещё раз.",
    });
  }

  const navigate = useNavigate();

  //используем хук для запроса данных.
  useEffect(() => {
    //условная конструкция выполнит запрос только при значении стейта TRUE
    if (loggedIn) {
      api
        .getUserData()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    handleTokenCheck();
  }, []);

  //используем хук для запроса данных.
  useEffect(() => {
    //условная конструкция выполнит запрос только при значении стейта TRUE
    if (loggedIn) {
      api
        .getInitialCards()
        .then((res) => {
          setCards(res);
        })
        .catch((error) => {
          console.log(error);
        });
      //передаем пустой массив зависимостей
      //без этого будут бесконечные запросы.
    }
  }, [loggedIn]);

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

  function handleInfotooltip() {
    setIsInfotooltipPopupOpen(true);
  }

  //эта функция будет вызываться на каждом компоненте с попапом. Служит для закрытия по клику на крестик.
  function closeAllPopups() {
    setIsInfotooltipPopupOpen(false);
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

  const handleTokenCheck = () => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      auth.checkTokenValidity(jwt).then((res) => {
        setUserEmail(res.data.email);
        console.log(res.data.email);
        setLoggedIn(true);
        navigate("/", { replace: true });
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setUserEmail("");
    setLoggedIn(false);
    // navigate("/signin", { replace: true });
  };

  const handleLogin = () => {
    handleTokenCheck();
  };

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <Header
                  onClick={handleLogout}
                  userEmail={userEmail}
                  buttonCaption={"Выйти"}
                />
                <ProtectedRouteElement
                  element={Main}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  cards={cards}
                  onCardDelete={handleCardDelete}
                  loggedIn={loggedIn}
                />
              </>
            }
          />
          <Route
           exact path="/signup"
            element={
              <>
                <Header onLogOut={handleLogout} buttonCaption={"Войти"} />
                <Register
                  handleInfotooltip={handleInfotooltip}
                  handleSuccess={handleSuccess}
                  handleFail={handleFail}
                />
              </>
            }
          />
          <Route
           exact path="/signin"
            element={
              <>
                <Header onLogOut={handleLogout} buttonCaption={"Регистрация"} />
                <Login handleLogin={handleLogin} />
              </>
            }
          />
        </Routes>

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

        <InfoTooltip
          name={"popup-tooltip"}
          isOpen={isInfotooltipPopupOpen}
          onClose={closeAllPopups}
          image={isInfotooltipSuccessful.image}
          title={isInfotooltipSuccessful.heading}
        />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;

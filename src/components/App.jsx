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
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Login } from "./Login";
import * as auth from "../utils/auth";
import ProtectedRouteElement from "./ProtectedRoute";
import tooltipSuccess from "../images/tooltip-success.png";
import tooltipFail from "../images/tooltip-fail.png";

function App() {
  const [isInfoTooltipPopupOpen, setIsInfotooltipPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const [infoTooltipState, setInfoTooltipState] = useState({
    image: "",
    heading: "",
  });

  function setSuccessInfoTooltip() {
    setInfoTooltipState({
      image: tooltipSuccess,
      heading: "Вы успешно зарегистрировались!",
    });
  }

  function setFailInfoTooltip() {
    setInfoTooltipState({
      image: tooltipFail,
      heading: "Что-то пошло не так! Попробуйте ещё раз.",
    });
  }

  const navigate = useNavigate();

  useEffect(() => {
    handleTokenCheck();
  }, []);

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
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleUpdateUser(data) {
    api
      .updateUserInfo(data)
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
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkTokenValidity(jwt)
        .then((res) => {
          // setUserEmail(res.data.email);
          // setLoggedIn(true);
          // navigate("/", { replace: true });
          handleLogin(res.data.email);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setUserEmail("");
    setLoggedIn(false);
  };

  const handleLogin = (email) => {
    setUserEmail(email)
    setLoggedIn(true);
    navigate("/", { replace: true });
  };

  const navigateToSignIn = () => {
    navigate("/signin", { replace: true });
  };

  const navigateToSignUp = () => {
    navigate("/signup", { replace: true });
  };

  return (
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
          exact
          path="/signup"
          element={
            <>
              <Header onClick={navigateToSignIn} buttonCaption={"Войти"} />
              <Register
                handleInfotooltip={handleInfotooltip}
                handleSuccess={setSuccessInfoTooltip}
                handleFail={setFailInfoTooltip}
              />
            </>
          }
        />
        <Route
          exact
          path="/signin"
          element={
            <>
              <Header
                onClick={navigateToSignUp}
                buttonCaption={"Регистрация"}
              />
              <Login handleLogin={handleLogin} />
            </>
          }
        />

        {/* редирект в случае несуществующего роута */}
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>

      <Footer />
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
        isOpen={isInfoTooltipPopupOpen}
        onClose={closeAllPopups}
        image={infoTooltipState.image}
        title={infoTooltipState.heading}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;

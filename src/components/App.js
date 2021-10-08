import { React, useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";

// Импорт компоонентов
import Header from "./Header";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import Main from "./Main";
import ErrorPopup from "./ErrorPopup";
import Confirmation from "./Confirmation";

// Импорт utils
import api from "../utils/api.js";

function App() {
  const fakeUser = {
    email: "kode@kode.ru",
    password: "Enk0deng",
  };

  const [loggedIn, setLoggedIn] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [authData, setAuthData] = useState({});
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [types, setTypes] = useState([]);
  const [subtypes, setSubtypes] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [copyCards, setCopyCards] = useState([]);

  const history = useHistory();

  // Проверка токена
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      setIsConfirmed(true);
      getTypes();
      getSubtypes();
      getCards();
      history.push("/");
    } else {
      setIsConfirmed(false);
      history.push("/sign-in");
    }
  }, [history]);

  // Рендер карточек с сервера
  function getCards() {
    api
      .getCards()
      .then((res) => {
        setCards(res.data);
        setCopyCards(res.data);
      })
      .catch((err) => console.log(err));
  }

  // Рендер типов
  function getTypes() {
    api
      .getTypes()
      .then((res) => {
        setTypes(res.data);
      })
      .catch((err) => console.log(err));
  }

  // Рендер подтипов
  function getSubtypes() {
    api
      .getSubtypes()
      .then((res) => {
        setSubtypes(res.data);
      })
      .catch((err) => console.log(err));
  }

  // Авторизация и запись токена в LocalStorage(имитация)
  function checkMatch(data) {
    if (JSON.stringify(data) === JSON.stringify(fakeUser)) {
      setAuthData(data);
      setLoggedIn(true);
      history.push("/confirmation");
    } else {
      setIsInfoToolTipOpen(true);
    }
  }

  // Подтверждение по коду из SMS(имитация)
  function checkCode({ code }) {
    const fakeCode = 123456;
    if (code == fakeCode) {
      setLoggedIn(false);
      setIsConfirmed(true);
      localStorage.setItem(
        "jwt",
        `${authData.email}${authData.password}some_secret_key`
      );
      history.push("/");
    } else {
      setIsInfoToolTipOpen(true);
    }
  }

  // Выход из системы
  function signOut() {
    localStorage.removeItem("jwt");
    history.push("/sign-in");
    setIsConfirmed(false);
    setLoggedIn(false);
  }

  // Закрытие любого из попапов
  function closeAllPopups() {
    setIsInfoToolTipOpen(false);
  }

  // ФУНКЦИОНАЛЬНОСТЬ ДЛЯ ФИЛЬТРАЦИИ КАРТОЧЕК
  // Задание опций для фильтрации карточек
  function getSelectedOptions(options) {
    setSelectedOptions(options);
  }
  
  useEffect(() => {
    setCards(() => {
      return copyCards.filter((item) => {
        if (!selectedOptions.type && !selectedOptions.subtype) {
          return true;
        } else if (
          item.types.includes(selectedOptions.type) &&
          !selectedOptions.subtype
        ) {
          return true;
        } else if (
          !selectedOptions.type &&
          item.subtypes.includes(selectedOptions.subtype)
        ) {
          return true;
        } else if (
          item.types.includes(selectedOptions.type) &&
          item.subtypes.includes(selectedOptions.subtype)
        ) {
          return true;
        }
        return false;
      });
    });
  }, [selectedOptions]);

  return (
    <>
      <div className="page">
        <Header
          signOut={signOut}
          loggedIn={loggedIn}
          isConfirmed={isConfirmed}
        />
        <Switch>
          <Route path="/sign-in">
            <Login checkMatch={checkMatch} />
          </Route>

          <Route path="/confirmation">
            <Confirmation loggedIn={loggedIn} confirm={checkCode} />
          </Route>

          <ProtectedRoute
            path="/"
            isConfirmed={isConfirmed}
            component={Main}
            cards={cards}
            types={types}
            subtypes={subtypes}
            getSelectedOptions={getSelectedOptions}
          />
        </Switch>
      </div>

      <ErrorPopup isOpen={isInfoToolTipOpen} onClose={closeAllPopups} />
    </>
  );
}

export default App;

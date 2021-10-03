import { React, useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import Main from "./Main";
import ErrorPopup from "./ErrorPopup";
import Confirmation from "./Confirmation";

function App() {
  const fakeUser = {
    email: "kode@kode.ru",
    password: "Enk0deng",
  };

  const [loggedIn, setLoggedIn] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [authData, setAuthData] = useState({});
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);

  const history = useHistory();

  // Проверка токена
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      setIsConfirmed(true);
      history.push("/");
    } else {
      setIsConfirmed(false);
      history.push("/sign-in");
    }
  }, [history]);

  // Авторизация(имитация) и запись токена в LocalStorage.
  function checkMatch(data) {
    if (JSON.stringify(data) === JSON.stringify(fakeUser)) {
      setAuthData(data);
      setLoggedIn(true);
      history.push("/confirmation");
    } else {
      setIsInfoToolTipOpen(true);
    }
  }

  // Подтверждение по коду из SMS
  function checkCode(code) {
    if (code) {
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

  return (
    <>
      <div className="page">
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
            signOut={signOut}
          />
        </Switch>
      </div>

      <ErrorPopup isOpen={isInfoToolTipOpen} onClose={closeAllPopups} />
    </>
  );
}

export default App;

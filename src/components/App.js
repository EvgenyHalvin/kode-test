import react, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import Main from "./Main";

function App() {
  const fakeUser = {
    email: "kode@kode.ru",
    password: "Enk0deng",
  };

  const [loggedIn, setLoggedIn] = useState(false);
  const [stateCard, setStateCard] = useState(false);

  const history = useHistory();

  // Проверка токена
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      setLoggedIn(true);
      history.push("/");
    } else {
      console.log("token not found");
    }
  }, [history]);

  // Авторизация(имитация) и запись токена в LocalStorage.
  function checkMatch(data) {
    if (JSON.stringify(data) === JSON.stringify(fakeUser)) {
      setLoggedIn(true);
      localStorage.setItem(
        "jwt",
        `${data.email}${data.password}some_secret_key`
      );
      history.push("/");
    } else {
      setStateCard(true);
    }
  }

  // Выход из системы
  function signOut() {
    localStorage.removeItem("jwt");
    history.push("/sign-in");
    setLoggedIn(false);
  }

  return (
    <div className="page">
      <Switch>
        <Route path="/sign-in">
          <Login checkMatch={checkMatch} />
        </Route>

        <ProtectedRoute
          path="/"
          loggedIn={loggedIn}
          component={Main}
          signOut={signOut}
        />
      </Switch>
    </div>
  );
}

export default App;

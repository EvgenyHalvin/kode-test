import react, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const history = useHistory();
  
  return (
    <div className="page">
      <Switch>
        <Route path="/sign-in">
          <Login />
        </Route>

        <ProtectedRoute path="/" loggedIn={loggedIn} />
      </Switch>
    </div>
  );
}

export default App;

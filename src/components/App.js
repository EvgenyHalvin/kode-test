import react, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import Login from "./Login";

function App() {
  return <div className="page">
    <Switch>
      <Route path="/sign-in">
        <Login />
      </Route>

      <ProtectedRoute
        path="/"
      />
    </Switch>
  </div>
}

export default App;

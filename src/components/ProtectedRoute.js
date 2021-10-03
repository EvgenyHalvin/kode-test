import React from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ component: Component, ...props }) {
  return (
    <Route>
      {() =>
        props.isConfirmed ? <Component {...props} /> : <Redirect to="/sign-in" />
      }
    </Route>
  );
}

export default ProtectedRoute;

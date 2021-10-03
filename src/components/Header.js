import React from "react";
import { Link } from "react-router-dom";

function Header({ loggedIn, isConfirmed, signOut }) {
  return (
    <div className="header">
      <Link to="/" className="header__logo">
        LOGO
      </Link>
      <div className="header__status">
        <>
          {loggedIn ? (
            <Link to="/sign-in" className="header__link" onClick={signOut}>
              Назад
            </Link>
          ) : isConfirmed ? (
            <p className="header__link" onClick={signOut}>
              Выйти
            </p>
          ) : (
            ""
          )}
        </>
      </div>
    </div>
  );
}

export default Header;

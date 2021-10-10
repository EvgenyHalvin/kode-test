import React from "react";
import { Link } from "react-router-dom";

import { PocemonFullInfoContext } from "../contexts/pocemonFullInfoContext.js";

function FullInfoCard() {
  const pokemon = React.useContext(PocemonFullInfoContext);
  
  return (
    <>
      <Link to="/pokemon">Назад</Link>
      <h1 style={{ color: "white" }}>Hello, User!!! This is {pokemon.name}.</h1>
    </>
  );
}

export default FullInfoCard;

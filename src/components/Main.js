import react from "react";

function Main({ signOut }) {
  return (
    <>
      <h1 style={{ color: "#fff" }}>Main</h1>
      <button type="button" onClick={signOut} style={{height: "30px"}}>
        Выйти
      </button>
    </>
  );
}

export default Main;

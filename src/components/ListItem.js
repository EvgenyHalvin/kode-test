import React from "react";

function ListItem({ item, selectItem }) {
  function select() {
    selectItem(item);
  }

  return (
  <li className="selector__list-item" onClick={select}>
    {item}
  </li>
  );
}

export default ListItem;

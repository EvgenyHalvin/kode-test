import { React, useState, useEffect, useRef } from "react";
import ListItem from "./ListItem";

function Selector({ selesctItem, listItems, typeSelector, isGotItems }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectValue, setSelectValue] = useState("");
  const [listValueItems, setListValueItems] = useState([]);
  const [titleSelect, setTitleSelect] = useState("");

  useEffect(() => {
    setListValueItems(listItems);
  }, [listItems]);

  useEffect(() => {
    if(typeSelector === "type") {
      setTitleSelect("Выберите тип")
    } else {
      setTitleSelect("Выберите подтип")
    }
  })

  useEffect(() => {
    if (listItems) {
      setListValueItems(() =>
        listItems.filter((item) =>
          item.toLowerCase().includes(selectValue.toLowerCase())
        )
      );
    }
  }, [selectValue]);

  function changeOption(e) {
    setSelectValue(e.target.value);
  }

  function handleMenu() {
    setIsMenuOpen(!isMenuOpen);
    setSelectValue("");
  }

  function choiceTypeAndSelect(item) {
    setSelectValue(item);
    setItemTitle(item);
    selesctItem(item, typeSelector);
  }

  function setItemTitle(name) {
    setTitleSelect(name);
    setIsMenuOpen(false);
    setSelectValue("");
  }

  return (
    <div className="selector" >
      {isGotItems ? (
        <div className="selector__switch selector__switch_disabled">
          Идёт загрузка...
          <div className="loader" />
        </div>
      ) : (
        <div
          className={`selector__switch ${
            isMenuOpen ? "selector__switch_opened" : ""
          }`}
          onClick={() => handleMenu()}
        >
          {titleSelect}
          <span
            className={`selector__arrow ${
              isMenuOpen ? "selector__arrow_opened" : ""
            }`}
          ></span>
        </div>
      )}
      <div
        className={`selector__menu ${
          isMenuOpen ? "selector__menu_opened" : ""
        }`}
      >
        <input
          type="text"
          name="finder"
          className="selector__finder"
          placeholder="Искать... "
          value={selectValue || ""}
          onChange={changeOption}
          autoComplete="off"
        />
        <ul className="selector__list">
          {listValueItems.map((item, i) => (
            <ListItem key={i} item={item} selectItem={choiceTypeAndSelect} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Selector;

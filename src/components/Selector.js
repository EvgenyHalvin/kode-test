import { React, useState, useEffect } from "react";
import ListItem from "./ListItem";

function Selector({
  selesctItem,
  listItems,
  typeSelector,
  isGotItems,
  menuId,
  menuList,
  toggleMenu,
}) {
  // eslint-disable-next-line no-unused-vars
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectValue, setSelectValue] = useState("");
  const [listValueItems, setListValueItems] = useState([]);
  const [titleSelect, setTitleSelect] = useState("");

  useEffect(() => {
    setListValueItems(listItems);
  }, [listItems]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (typeSelector === "type") {
      setTitleSelect("Выберите тип");
    } else {
      setTitleSelect("Выберите подтип");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (listItems) {
      setListValueItems(() =>
        listItems.filter((item) =>
          item.toLowerCase().includes(selectValue.toLowerCase())
        )
      );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectValue]);

  function changeOption(e) {
    setSelectValue(e.target.value);
  }

  function handleMenu() {
    // setIsMenuOpen(!isMenuOpen);
    toggleMenu(menuId)
    setSelectValue("");
  }

  function choiceTypeAndSelect(item) {
    setSelectValue(item);
    setItemTitle(item);
    selesctItem(item, typeSelector);
    handleMenu();
  }

  function setItemTitle(name) {
    setTitleSelect(name);
    setIsMenuOpen(false);
    setSelectValue("");
  }

  return (
    <div className="selector">
      {isGotItems ? (
        <div className="selector__switch selector__switch_disabled">
          Идёт загрузка...
          <div className="loader" />
        </div>
      ) : (
        <div
          className={`selector__switch ${
            menuList[menuId] ? "selector__switch_opened" : ""
          }`}
          onClick={() => handleMenu()}
        >
          {titleSelect}
          <span
            className={`selector__arrow ${
              menuList[menuId] ? "selector__arrow_opened" : ""
            }`}
          ></span>
        </div>
      )}
      <div
        className={`selector__menu ${
          menuList[menuId] ? "selector__menu_opened" : ""
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

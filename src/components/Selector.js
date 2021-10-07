import { React, useState, useEffect } from "react";
import ListItem from "./ListItem";

function Selector({ selesctItem, listItems, typeSelector }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectValue, setSelectValue] = useState();
  const [listValueItems, setListValueItems] = useState([]);

  useEffect(() => {
    setListValueItems(listItems);
  }, [listItems]);

  useEffect(() => {
    setListValueItems(listValueItems => listValueItems.filter((item) => item === selectValue))
  },[selectValue])

  function changeOption(e) {
    setSelectValue(e.target.value);
  }

  function handleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  function choiceTypeAndSelect(item) {
    selesctItem(item, typeSelector);
  }

  return (
    <div className="selector">
      <div className="selector__switch" onClick={() => handleMenu()}>
        {isMenuOpen ? "Свернуть список" : "Раскрыть список"}
      </div>
      <div
        className={`selector__menu ${
          isMenuOpen ? "selector__menu_opened" : ""
        }`}
      >
        <input
          type="text"
          name="finder"
          className="selector__finder"
          placeholder="Искать"
          value={selectValue || ""}
          onChange={changeOption}
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

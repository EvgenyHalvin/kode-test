import { React, useState, useEffect } from "react";
import Selector from "./Selector";

function Sidebar(props) {
  const { types, subtypes, getSelectedOptions, isGotItems } = props;

  const [selectedItems, setSelectedItems] = useState({});
  const [menuList, setMenuList] = useState({ one: false, two: false });

  useEffect(() => {
    getSelectedOptions(selectedItems);
  }, [selectedItems, getSelectedOptions]);

  function getSelectedItems(item, typeSelector) {
    typeSelector === "type"
      ? setSelectedItems({ ...selectedItems, type: item })
      : setSelectedItems({ ...selectedItems, subtype: item });
  }

  function toggleMenu(menuId) {
    setMenuList(() => {
      return Object.assign(
        { one: false, two: false },
        { [menuId]: !menuList[menuId] }
      );
    });
  }

  return (
    <div className="sidebar">
      <Selector
        menuId="one"
        menuList={menuList}
        toggleMenu={toggleMenu}
        selesctItem={getSelectedItems}
        isGotItems={isGotItems}
        listItems={types}
        typeSelector="type"
      />
      <Selector
        menuId="two"
        menuList={menuList}
        toggleMenu={toggleMenu}
        selesctItem={getSelectedItems}
        isGotItems={isGotItems}
        listItems={subtypes}
        typeSelector="subtype"
      />
    </div>
  );
}

export default Sidebar;

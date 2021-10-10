import { React, useState, useEffect } from "react";
import Selector from "./Selector";

function Sidebar(props) {
  const { types, subtypes, getSelectedOptions } = props;
  
  const [selectedItems, setSelectedItems] = useState({});

  useEffect(() => {
    getSelectedOptions(selectedItems)
  }, [selectedItems, getSelectedOptions])

  function getSelectedItems(item, typeSelector) {
    typeSelector === "type" ? setSelectedItems({ ...selectedItems, type: item}) : setSelectedItems({ ...selectedItems, subtype: item})
  }

  return (
      <div className="sidebar">
        <Selector selesctItem={getSelectedItems} listItems={types} typeSelector="type" />
        <Selector selesctItem={getSelectedItems} listItems={subtypes} typeSelector="subtype" />
      </div>
  );
}

export default Sidebar;

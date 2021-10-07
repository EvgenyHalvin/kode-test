import { React, useState } from "react";
import Cards from "./Cards";
import Sidebar from "./Sidebar";

function Main(props) {
  const { cards, types, subtypes } = props;
  const [selectedOptions, setSelectedOptions] = useState({});

  function getSelectedOptions(options) {
    setSelectedOptions(options)
  }

  return (
    <div className="main">
      <Sidebar
        types={types}
        subtypes={subtypes}
        getSelectedOptions={getSelectedOptions}
      />
      <Cards cards={cards} options={selectedOptions} />
    </div>
  );
}

export default Main;

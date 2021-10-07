import { React, useState } from "react";

import Cards from "./Cards";
import Sidebar from "./Sidebar";
import Pagination from "./Pagination";
import { useEffect } from "react/cjs/react.development";

function Main(props) {
  const { cards, types, subtypes } = props;

  const [selectedOptions, setSelectedOptions] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(4);
  const [pagesAmount, setPagesAmount] = useState(1);
  const [defaultCards, setDefaultCards] = useState(cards);

  useEffect(() => {
    setDefaultCards(cards);
    changePage(1);
  }, [cards]);

  useEffect(() => {
    setPagesAmount(Math.ceil(cards.length / cardsPerPage));
  }, [cards]);

  useEffect(() => {
    changePage(currentPage);
  }, [currentPage]);

  function changePage(numberPage) {
    setDefaultCards(
      cards.slice(
        numberPage * cardsPerPage - cardsPerPage,
        numberPage * cardsPerPage
      )
    );
  }

  function nextPage() {
    setCurrentPage(prev => {
      if (prev === pagesAmount) {
        return prev
      } else {
        return prev + 1
      }
    });
  }

  function prevPage() {
    setCurrentPage(prev => {
      if (prev === 1) {
        return prev
      } else {
        return prev - 1
      }
    });
  }

  function firstPage() {
    setCurrentPage(1);
  }

  function lastPage() {
    setCurrentPage(pagesAmount);
  }

  function getSelectedOptions(options) {
    setSelectedOptions(options);
  }

  return (
    <div className="main">
      <Sidebar
        types={types}
        subtypes={subtypes}
        getSelectedOptions={getSelectedOptions}
      />
      <Cards cards={defaultCards} options={selectedOptions} />
      <Pagination
        currentPage={currentPage}
        routePage={{ nextPage, prevPage, firstPage, lastPage }}
      />
    </div>
  );
}

export default Main;

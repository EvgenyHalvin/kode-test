import { React, useState } from "react";

import Cards from "./Cards";
import Sidebar from "./Sidebar";
import Pagination from "./Pagination";
import { useEffect } from "react/cjs/react.development";

function Main(props) {
  const { cards, types, subtypes, getSelectedOptions } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(4);
  const [pagesAmount, setPagesAmount] = useState(1);
  const [defaultCards, setDefaultCards] = useState(cards);

  // ФУНКЦИОНАЛЬНОСТЬ ДЛЯ ПАГИНАЦИИ:
  // Начальный рендер первой страницы с карточкамми
  useEffect(() => {
    setDefaultCards(cards); // В этом месте пока что еще целый массив
    changePage(1); // Здесь массив уже урезан до объема, отображаемого на странице
  }, [cards]);

  // Установка количества страниц
  useEffect(() => {
    setPagesAmount(Math.ceil(cards.length / cardsPerPage));
  }, [cards]);

  // Зависимость выбора части массива от страницы
  useEffect(() => {
    changePage(currentPage);
  }, [currentPage]);

  // Оставляем только ту часть массива, которая нужна для отображения на странице
  function changePage(numberPage) {
    setDefaultCards(
      cards.slice(
        numberPage * cardsPerPage - cardsPerPage,
        numberPage * cardsPerPage
      )
    );
  }

  // Переключиться на след.страницу
  function nextPage() {
    setCurrentPage(prev => {
      if (prev === pagesAmount) {
        return prev
      } else {
        return prev + 1
      }
    });
  }

  // Переключиться на предыдущ.страницу
  function prevPage() {
    setCurrentPage(prev => {
      if (prev === 1) {
        return prev
      } else {
        return prev - 1
      }
    });
  }

  // Переключиться на первую страницу
  function firstPage() {
    setCurrentPage(1);
  }

  // Переключиться на последнюю страницу
  function lastPage() {
    setCurrentPage(pagesAmount);
  }

  return (
    <div className="main">
      <Sidebar
        types={types}
        subtypes={subtypes}
        getSelectedOptions={getSelectedOptions}
      />
      <Cards cards={defaultCards} />
      <Pagination
        currentPage={currentPage}
        pagesAmount={pagesAmount}
        routePage={{ nextPage, prevPage, firstPage, lastPage }}
      />
    </div>
  );
}

export default Main;

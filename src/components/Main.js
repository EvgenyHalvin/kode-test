import { React, useState, useEffect } from "react";

import Cards from "./Cards";
import Sidebar from "./Sidebar";
import Pagination from "./Pagination";

function Main(props) {
  const {
    cards,
    types,
    subtypes,
    getSelectedOptions,
    getPokemonInfo,
    isGotItems,
    onClose,
    setCardInfo,
    openFullImage,
    getCards,
    getTypes,
    getSubtypes,
  } = props;

  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [cardsPerPage, setCardsPerPage] = useState(4);
  const [pagesAmount, setPagesAmount] = useState(1);
  const [defaultCards, setDefaultCards] = useState(cards);

  useEffect(() => {
    getCards();
    getTypes();
    getSubtypes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  // ФУНКЦИОНАЛЬНОСТЬ ДЛЯ ПАГИНАЦИИ:
  // Начальный рендер первой страницы с карточкамми
  useEffect(() => {
    setDefaultCards(cards); // В этом месте пока что еще целый массив
    changePage(1); // Здесь массив уже урезан до объема, отображаемого на странице
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards]);

  // Установка количества страниц
  useEffect(() => {
    setPagesAmount(Math.ceil(cards.length / cardsPerPage));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards]);

  // Зависимость выбора части массива от страницы
  useEffect(() => {
    changePage(currentPage);
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // Переход на первую страницу при выборе фильтров
  useEffect(() => {
    setCurrentPage(1);
  }, [cards]);

  // Переключиться на след.страницу
  function nextPage() {
    setCurrentPage((prev) => {
      if (prev === pagesAmount) {
        return prev;
      } else {
        return prev + 1;
      }
    });
  }

  // Переключиться на предыдущ.страницу
  function prevPage() {
    setCurrentPage((prev) => {
      if (prev === 1) {
        return prev;
      } else {
        return prev - 1;
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
        isGotItems={isGotItems}
      />
      <div className="main-side">
        <Cards
          cards={defaultCards}
          getPokemonInfo={getPokemonInfo}
          isGotItems={isGotItems}
          onClose={onClose}
          setCardInfo={setCardInfo}
          openFullImage={openFullImage}
        />
        <Pagination
          currentPage={currentPage}
          pagesAmount={pagesAmount}
          isGotItems={isGotItems}
          routePage={{ nextPage, prevPage, firstPage, lastPage }}
        />
      </div>
    </div>
  );
}

export default Main;

import React from "react";

function Pagination({ currentPage, routePage, pagesAmount, isGotItems }) {
  const { nextPage, prevPage, firstPage, lastPage } = routePage;

  return (
    <div className="pagination">
      {!isGotItems ? (
        <>
          <button
            className={`pagination__button ${
              currentPage === 1 ? "pagination__button_disabled" : ""
            }`}
            disabled={currentPage === 1 ? true : false}
            onClick={firstPage}
          >
            на первую
          </button>
          <button
            className={`pagination__button ${
              currentPage === 1 ? "pagination__button_disabled" : ""
            }`}
            disabled={currentPage === 1 ? true : false}
            onClick={prevPage}
          >
            предыдущая
          </button>
          <button className="pagination__button">
            {currentPage} / {pagesAmount}
          </button>
          <button
            className={`pagination__button ${
              currentPage === pagesAmount ? "pagination__button_disabled" : ""
            }`}
            disabled={currentPage === pagesAmount ? true : false}
            onClick={nextPage}
          >
            следующая
          </button>
          <button
            className={`pagination__button ${
              currentPage === pagesAmount ? "pagination__button_disabled" : ""
            }`}
            disabled={currentPage === pagesAmount ? true : false}
            onClick={lastPage}
          >
            на последнюю
          </button>
        </>
      ) : (
        // <div className="pagination__message">
        //   Подождите, идет загрузка карточек . . .
        //   <div className="loader" />
        // </div>
        ""
      )}
    </div>
  );
}

export default Pagination;

import React from "react";

function Pagination({ currentPage, routePage }) {
  const { nextPage, prevPage, firstPage, lastPage } = routePage;

  return (
    <div className="pagination">
      <button className="pagination__button" onClick={firstPage}>на первую</button>
      <button className="pagination__button" onClick={prevPage}>предыдущая</button>
      <button className="pagination__button">{currentPage}</button>
      <button className="pagination__button" onClick={nextPage}>
        следующая
      </button>
      <button className="pagination__button" onClick={lastPage}>на последнюю</button>
    </div>
  );
}

export default Pagination;

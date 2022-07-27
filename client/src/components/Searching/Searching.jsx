import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setSortBook } from "../../redux/reducers/booksSlice";
import Cards from "../Cards/Cards";
import Filters from "../Filters/Filters";
import Pagination from "../Pagination/Pagination";
import SortByBook from "../SortyByBook/SortByBook";
import s from "./Searching.module.sass";

function Searching(props) {
  const { stack } = useSelector((state) => state.history);
  const history = useHistory();
  const { books } = useSelector((state) => state.books);
  const dispatch = useDispatch();
  useEffect(() => {
    if (stack.length <= 0) {
      history.push("/");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [books]);
  useEffect(() => {
    return () => {
      dispatch(setSortBook("A-Z"));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={s.container}>
      <div className={s.filterCont}>
        <Filters />
      </div>
      <div className={s.cardsCont}>
        {books[0] ? <Pagination /> : null}
        {books[0] ? (
          <div className={s.sort}>
            <SortByBook />
          </div>
        ) : null}
        <div className={s.cardsComponent}>
          <Cards />
        </div>
        {books[0] ? <Pagination /> : null}
      </div>
    </div>
  );
}

export default Searching;

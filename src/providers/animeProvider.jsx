import React, { memo } from "react";
import usePagination from "../hooks/usePagination";
import { AnimeContext } from "../context";
import { pagination } from "../config.json";
import { sortBy } from "../services/utilsService";
import { getPagedAnimes, deleteAnime } from "../services/animeService";
import {
  SET_REFRESH,
  SET_ITEMS,
  SET_PAGENUM,
  SEARCH_ITEMS,
  SET_START,
  SET_END,
  DELETE_ITEM,
  UPDATE_ITEM,
  ADD_ITEM,
  SET_TOTAL
} from "./../hooks/types";

const AnimeProvider = props => {
  const {
    state: { pageNum, items: animes, pages, total, ...rest },
    dispatch
  } = usePagination({ request: getPagedAnimes, take: pagination.perPage });

  const handleRefresh = () => {
    dispatch({ type: SET_REFRESH, payload: toggle => !toggle });
  };

  const handlePageChange = pageNum => {
    dispatch({ type: SET_PAGENUM, payload: pageNum });
  };

  const handleDelete = async anime => {
    let originalAnimes = [...animes];

    try {
      dispatch({ type: DELETE_ITEM, payload: anime.id });

      await deleteAnime(anime.id);
      return animes.length > 0;
    } catch (error) {
      dispatch({ type: SET_ITEMS, payload: originalAnimes });
      return originalAnimes.length > 0;
    }
  };

  const handleSetItems = animes => {
    dispatch({ type: SET_ITEMS, payload: animes });
  };

  const handleAdd = anime => {
    dispatch({ type: ADD_ITEM, payload: anime });
    dispatch({ type: SET_TOTAL, payload: total + 1 });
  };

  const handleUpdate = anime => {
    dispatch({ type: UPDATE_ITEM, payload: anime });
  };

  const handleSort = sortColumn => {
    dispatch({ type: SET_ITEMS, payload: sortBy(animes, sortColumn) });
  };

  const handleSearch = title => {
    dispatch({ type: SEARCH_ITEMS, payload: title });
  };

  const handleSetStart = start => {
    dispatch({ type: SET_START, payload: start });
  };

  const handleSetEnd = end => {
    dispatch({ type: SET_END, payload: end });
  };

  return (
    <AnimeContext.Provider
      value={{
        state: { animes, pages, pageNum, total, ...rest },
        onSetItems: handleSetItems,
        onDelete: handleDelete,
        onRefresh: handleRefresh,
        onPageChange: handlePageChange,
        onSort: handleSort,
        onSearch: handleSearch,
        onSetStart: handleSetStart,
        onSetEnd: handleSetEnd,
        onAdd: handleAdd,
        onUpdate: handleUpdate
      }}
    >
      {props.children}
    </AnimeContext.Provider>
  );
};

export default memo(AnimeProvider);

import { useEffect, useReducer } from "react";
import { toast } from "react-toastify";
import { pagination } from "../config.json";

import {
  SET_ITEMS,
  SET_PAGENUM,
  SET_PAGES,
  SET_TOTAL,
  SET_REFRESH,
  SEARCH_ITEMS,
  SET_START,
  SET_END,
  DELETE_ITEM,
  ADD_ITEM,
  UPDATE_ITEM
} from "./types";

const reducer = (state, action) => {
  const { payload, type } = action;
  switch (type) {
    case SET_PAGENUM:
      return { ...state, pageNum: payload };
    case SET_ITEMS:
      return { ...state, items: payload };
    case ADD_ITEM:
      return { ...state, items: [payload, ...state.items] };
    case UPDATE_ITEM:
      const items = state.items.filter(item => item.id !== payload.id);
      return { ...state, items: [payload, ...items] };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== payload)
      };
    case SET_PAGES:
      return { ...state, pages: payload };
    case SET_TOTAL:
      return { ...state, total: payload };
    case SET_START:
      return { ...state, start: payload };
    case SET_END:
      return { ...state, end: payload };
    case SET_REFRESH:
      return { ...state, toggle: payload };
    case SEARCH_ITEMS:
      return { ...state, title: payload };
    default:
      return state;
  }
};

const usePagination = ({
  request,
  data = "data",
  pages = "lastPage",
  total = "total",
  take = 15
}) => {
  const initialState = {
    items: [],
    pageNum: 1,
    pages: 0,
    total: 0,
    take,
    toggle: false,
    start: 1,
    end: pagination.pageNumbers
  };
  const [{ toggle, title, pageNum, ...rest }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(
    () => {
      request(pageNum, take, title)
        .then(response => {
          dispatch({ type: SET_ITEMS, payload: response[data] });
          dispatch({ type: SET_PAGES, payload: response[pages] });
          dispatch({ type: SET_TOTAL, payload: response[total] });
        })
        .catch(({ response }) => {
          if (response && response.status === 404) {
            dispatch({ type: SET_ITEMS, payload: [] });
            dispatch({ type: SET_PAGES, payload: 0 });
            dispatch({ type: SET_TOTAL, payload: 0 });
            dispatch({ type: SET_PAGENUM, payload: 1 });
            toast.error("No result/s found");
          }
        });
    },
    [toggle, title, pageNum]
  );

  useEffect(
    () => {
      dispatch({ type: SET_ITEMS, payload: [] });
    },
    [title, pageNum]
  );

  return {
    state: { toggle, pageNum, take, ...rest },
    dispatch
  };
};

export default usePagination;

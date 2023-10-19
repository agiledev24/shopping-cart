import Product from "@data/models/product";
import { useCallback, useEffect, useReducer } from "react";
import useAsyncAction from "./useAsyncAction";

type State = {
  items: Array<Product> | null;
  total: number;
  page: number;
};

const initialState: State = {
  items: null,
  total: 0,
  page: 0,
};

enum ProductsActionType {
  DataLoaded = "DATA_LOADED",
  Reset = "RESET",
}

type Action = {
  type: ProductsActionType;
  items?: Array<Product> | null;
  total?: number;
  page?: number;
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ProductsActionType.DataLoaded:
      const newData =
        action.items?.reduce(
          (acc, curr) => {
            if (!state.items?.find((i) => i.id === curr.id)) {
              acc.push(curr);
            }

            return acc;
          },
          [...(state.items ?? [])]
        ) ?? [];

      return {
        items: newData,
        total: action.total ? action.total : state.total,
        page:
          action.page && action.page > state.page ? action.page : state.page,
      };
    case ProductsActionType.Reset:
      return {
        ...initialState,
      };
    default:
      throw new Error("Un-Implemented action type");
  }
}

export default function useProducts(pageSize = 18) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [fetchList, loading, { error }] = useAsyncAction<any, any>(
    useCallback(
      async (page) => {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE}/products?page=${page}&size=${pageSize}`
        );
        const data = await response.json();
        return data;
      },
      [pageSize]
    ),

    useCallback((res, [page]) => {
      dispatch({
        type: ProductsActionType.DataLoaded,
        items: res.items,
        total: res.total,
        page,
      });
    }, [])
  );

  useEffect(() => {
    fetchList(0);
  }, [fetchList]);

  const hasMore = state.total > (state.items?.length || 0);

  const loadMore = useCallback(() => {
    if (hasMore) {
      fetchList(state.page + 1);
    }
  }, [fetchList, hasMore, state.page]);

  return {
    items: state.items,
    loading,
    error,
    loadMore,
    hasMore,
  };
}

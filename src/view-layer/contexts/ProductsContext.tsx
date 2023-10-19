import {
  createContext,
  useContext,
  PropsWithChildren,
  useState,
  useCallback,
} from "react";
import useProducts from "@data/hooks/useProducts";
import Product from "@data/models/product";

const ProductsContext = createContext<
  | {
      items: Array<Product> | null;
      loading: boolean;
      error: any;
      loadMore: () => void;
      hasMore: boolean;
      updateCart: (id: string) => void;
      carts: Array<string>;
    }
  | undefined
>(undefined);

export const ProductsProvider = ({ children }: PropsWithChildren) => {
  const [carts, setCarts] = useState<Array<string>>([]);
  const value = useProducts();

  const updateCart = useCallback(
    (id: string) => {
      if (carts.includes(id)) {
        setCarts(carts.filter((_id) => _id !== id));
      } else {
        setCarts([...carts, id]);
      }
    },
    [carts]
  );

  return (
    <ProductsContext.Provider
      value={{
        ...value,
        carts,
        updateCart,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error("useProductsContext mustbe used within a ProductsProvider");
  }

  return context;
};

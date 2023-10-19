import { withPrivateRoute } from "@components/PrivateRoute";
import ProductItem from "@view/components/ProductItem";
import { useProductsContext } from "@view/contexts/ProductsContext";
import { withMainLayout } from "@view/layouts/MainLayout";

const Carts = () => {
  const { items, carts } = useProductsContext();
  const cartItems = items?.filter((item) => carts.includes(item.id));
  console.log("cartItems", cartItems);
  return (
    <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
      {(cartItems?.length || 0) > 0 ? (
        cartItems?.map((item) => <ProductItem item={item} />)
      ) : (
        <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl">
          No Items
        </p>
      )}
    </div>
  );
};

export default withPrivateRoute(withMainLayout(Carts));

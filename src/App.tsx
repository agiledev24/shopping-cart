import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import "./App.css";
import { AuthProvider } from "@view/contexts/AuthContext";
import { ProductsProvider } from "@view/contexts/ProductsContext";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProductsProvider>
          <AppRoutes />
        </ProductsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;

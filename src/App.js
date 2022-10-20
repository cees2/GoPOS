import Layout from "./components/Layout/Layout";
import { Switch, Redirect, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import EditCategory from "./pages/EditCategory";
import EditProduct from "./pages/EditProduct";
import ListOfCategories from "./pages/ListOfCategories";
import ListOfProducts from "./pages/ListOfProducts";
import { useEffect } from "react";
import useHttp from "./hooks/use-http";

function App() {
  const { getCategories, getProducts } = useHttp();
  useEffect(() => {
    const setInitialValues = async () => {
      await getCategories();
      await getProducts();
    };
    setInitialValues();
  }, []);

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/products">
          <ListOfProducts />
        </Route>
        <Route path="/categories">
          <ListOfCategories />
        </Route>
        <Route path="/edit-product">
          <EditProduct />
        </Route>
        <Route path="/edit-category">
          <EditCategory />
        </Route>
        <Route path="/add-product">
          <AddProduct />
        </Route>
        <Route path="*">
          <p>Could not find that resource</p>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;

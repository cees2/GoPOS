import { useDispatch } from "react-redux";
import { categoriesActions } from "../store/categoriesSlice";
import { productsActions } from "../store/productsSlice";

const DOMAIN = "https://newdemostock.gopos.pl";
const AUTHORIZATION = "fd9ba9e1-0788-4e8f-ac46-a43df43e205e";
const PARAMETER_ID = "219";

const useHttp = () => {
  const dispatch = useDispatch();

  const sendRequest = async (requestDetails) => {
    try {
      const response = await fetch(requestDetails.url, {
        method: requestDetails.method || "GET",
        body: requestDetails.body ? JSON.stringify(requestDetails.body) : null,
        headers: requestDetails.headers || null,
      });

      if (!response.ok)
        throw new Error("Something went wrong, try again later.");

      const data = await response.json();

      return data;
    } catch (err) {
      throw err;
    }
  };

  const getCategories = async () => {
    const categories = await sendRequest({
      url: `${DOMAIN}/ajax/${PARAMETER_ID}/product_categories`,
      headers: {
        Authorization: AUTHORIZATION,
      },
    });
    dispatch(categoriesActions.setCategories(categories.data));

    return categories;
  };

  const getOneCategory = async (categoryId) => {
    const category = await sendRequest({
      url: `${DOMAIN}/ajax/${PARAMETER_ID}/product_categories/${categoryId}`,
      headers: {
        Authorization: AUTHORIZATION,
      },
    });
    return category;
  };

  const updateCategory = async (categoryId, categoryBody) => {
    await sendRequest({
      url: `${DOMAIN}/ajax/219/product_categories/${categoryId}`,
      method: "PUT",
      headers: {
        Authorization: AUTHORIZATION,
        "Content-Type": "application/json",
      },
      body: categoryBody,
    });
  };

  const addCategory = async (categoryName) => {
    await sendRequest({
      url: `${DOMAIN}/ajax/${PARAMETER_ID}/product_categories`,
      method: "POST",
      body: { name: categoryName },
      headers: {
        Authorization: AUTHORIZATION,
        "Content-Type": "application/json",
      },
    });
  };

  const getProducts = async () => {
    const products = await sendRequest({
      url: `${DOMAIN}/ajax/${PARAMETER_ID}/products`,
      headers: {
        Authorization: AUTHORIZATION,
      },
    });
    dispatch(productsActions.setProducts(products.data));
  };

  const getOneProduct = async (productId) => {
    const product = await sendRequest({
      url: `${DOMAIN}/ajax/${PARAMETER_ID}/products/${productId}`,
      headers: {
        Authorization: AUTHORIZATION,
      },
    });

    return product;
  };

  const updateProduct = async (productId, productBody) => {
    await sendRequest({
      url: `${DOMAIN}/ajax/${PARAMETER_ID}/products/${productId}`,
      method: "PUT",
      headers: {
        Authorization: AUTHORIZATION,
        "Content-Type": "application/json",
      },
      body: productBody,
    });
  };

  const addProduct = async (productObj) => {
    await sendRequest({
      url: `${DOMAIN}/ajax/${PARAMETER_ID}/products`,
      headers: {
        "Content-Type": "application/json",
        Authorization: AUTHORIZATION,
      },
      body: productObj,
      method: "POST",
    });
  };

  return {
    sendRequest,
    getCategories,
    getOneCategory,
    updateCategory,
    addCategory,
    getProducts,
    getOneProduct,
    updateProduct,
    addProduct,
  };
};

export default useHttp;

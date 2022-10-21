import Card from "../../UI/Card";
import SubmitButton from "../../UI/SubmitButton";
import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import useHttp from "../../../hooks/use-http";
import classes from "./UpdateProduct.module.css";
import Header from "../../UI/Header";
import UserInput from "../../UI/UserInput";
import ActionResult from "../../UI/ActionResult";

const UpdateProduct = () => {
  const [actionResult, setActionResult] = useState("");
  const categories = useSelector((state) => state.categories.categories);
  const products = useSelector((state) => state.products.products);
  const oldProductNameInputRef = useRef();
  const oldProductCategoryInputRef = useRef();
  const newProductNameInputRef = useRef();
  const newProductCategoryInputRef = useRef();
  const { getProducts, getOneProduct, getOneCategory, updateProduct } =
    useHttp();

  const resetActionResult = () => {
    setTimeout(() => {
      setActionResult((prevState) => {
        return {
          type: prevState.type,
          message: prevState.message,
          isActive: false,
        };
      });
    }, 3500);
    setTimeout(() => setActionResult(""), 4000);
  };

  const setAction = (type, message) => {
    setActionResult({
      type,
      message,
      isActive: true,
    });
    resetActionResult();
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const oldProductName = oldProductNameInputRef.current.value.trim();
    const oldProductCategory = oldProductCategoryInputRef.current.value;
    const newProductName = newProductNameInputRef.current.value.trim();
    const newProductCategory = newProductCategoryInputRef.current.value;
    const oldProduct = products.find(
      (product) => product.name.toUpperCase() === oldProductName.toUpperCase()
    );

    if (!oldProductName || !newProductName) {
      setAction("error", "Fill in every input");
      return;
    }

    if (
      oldProductName === newProductName &&
      oldProductCategory === newProductCategory
    ) {
      setAction("error", "New product can not be the same as old one.");
      return;
    }

    if (!oldProduct) {
      setAction("error", "This product does not exist.");
      return;
    }

    //Checking if product with that category exist:

    const { id: oldProductId } = oldProduct;

    const { data: fetchedOldProduct } = await getOneProduct(oldProductId);

    if (fetchedOldProduct.name.toUpperCase() !== oldProductName.toUpperCase()) {
      setAction("error", "This product does not exist in our DB.");
      return;
    }

    const fetchedOldCategory = getOneCategory(oldProductId);

    if (!fetchedOldCategory) {
      setAction("error", "This category does not exist in our DB.");
      return;
    }

    const { id: oldCategoryId } = categories.find(
      (category) => category.name === oldProductCategory
    );

    if (fetchedOldProduct.category_id !== oldCategoryId) {
      setAction("error", "Incorrect category.");
      return;
    }

    // When compilator reaches this point --> old product & category is ok

    const newProduct = { ...fetchedOldProduct };
    newProduct.name = newProductName;
    newProduct.category_id = categories.find(
      (category) => category.name === newProductCategory
    ).id;

    try {
      await updateProduct(fetchedOldProduct.id, newProduct);
    } catch (err) {
      setAction("error", err.message);
      return;
    }

    await getProducts();

    setAction("success", "Product has been successfully updated");
  };

  return (
    <>
      <ActionResult
        type={actionResult.type}
        actionContent={actionResult.message}
        isActive={actionResult.isActive}
      />
      <Card class={classes.updateProductWrapper}>
        <Header headerContent="Change product" />
        <form
          onSubmit={formSubmitHandler}
          className={classes.updateProductForm}
        >
          <UserInput
            class=""
            type="text"
            for="productName"
            label="Old Product Name"
            id="oldProductName"
            name="oldProductName"
            placeholder="e.g. Cisowianka"
            inputRef={oldProductNameInputRef}
          />
          <UserInput
            class=""
            type="select"
            for="productCategory"
            label="Old Product Category"
            id="oldProductCategory"
            name="oldProductCategory"
            inputRef={oldProductCategoryInputRef}
          />
          <UserInput
            class=""
            type="text"
            for="productName"
            label="New Product Name"
            id="newProductName"
            name="newProductName"
            placeholder="e.g. Cisowianka"
            inputRef={newProductNameInputRef}
          />
          <UserInput
            class=""
            type="select"
            for="productCategory"
            label="New Product Category"
            id="newProductCategory"
            name="newProductCategory"
            inputRef={newProductCategoryInputRef}
          />
          <SubmitButton buttonContent="Submit" />
        </form>
      </Card>
    </>
  );
};

export default UpdateProduct;

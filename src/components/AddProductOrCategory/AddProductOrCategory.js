import classes from "./AddProductOrCategory.module.css";
import Card from "../UI/Card";
import SubmitButton from "../UI/SubmitButton";
import { useRef, useState } from "react";
import useHttp from "../../hooks/use-http";
import Header from "../UI/Header";
import UserInput from "../UI/UserInput";
import ActionResult from "../UI/ActionResult";

const AddProductOrCategory = () => {
  const [actionResult, setActionResult] = useState("");
  const [selectedAction, setSelectedAction] = useState("");
  const productNameInputRef = useRef();
  const productCategoryInputRef = useRef();
  const categoryNameInputRef = useRef();
  const { getCategories, addCategory, addProduct, getProducts } = useHttp();

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

  const productInputHandler = () => {
    setSelectedAction("product");
  };

  const categoryInputHandler = () => {
    setSelectedAction("category");
  };

  const productFormSubmitHandler = async (e) => {
    e.preventDefault();

    const productName = productNameInputRef.current.value.trim();
    const productCategory = productCategoryInputRef.current.value;

    if (!productName) {
      setActionResult({
        type: "error",
        message: "Please provide a product name.",
        isActive: true,
      });
      resetActionResult();
      return;
    }

    const { data: fetchedCategories } = await getCategories();

    const categoryId = fetchedCategories.find(
      (category) => category.name === productCategory
    ).id;

    const productToBeAdded = {
      name: productName,
      category_id: categoryId,
      measure_type: "Kilogram",
      type: "BASIC",
    };
    try {
      await addProduct(productToBeAdded);
    } catch (err) {
      setActionResult({
        type: "error",
        message: err.message,
        isActive: true,
      });
      resetActionResult();
      return;
    }
    await getProducts();

    setActionResult({
      type: "success",
      message: "Product has been successfully added.",
      isActive: true,
    });
    resetActionResult();
  };

  const categoryFormSubmitHandler = async (e) => {
    e.preventDefault();
    const categoryName = categoryNameInputRef.current.value.trim();

    if (!categoryName) {
      setActionResult({
        type: "error",
        message: "Provide a category name.",
        isActive: true,
      });
      resetActionResult();
      return;
    }

    const { data: fetchedCategories } = await getCategories();

    if (
      fetchedCategories.some(
        (category) => category.name.toUpperCase() === categoryName.toUpperCase()
      )
    ) {
      setActionResult({
        type: "error",
        message: "This category already exist.",
        isActive: true,
      });
      resetActionResult();
      return;
    }

    try {
      await addCategory(categoryName);
    } catch (err) {
      setActionResult({
        type: "error",
        message: err.message,
        isActive: true,
      });
      resetActionResult();
      return;
    }
    await getCategories();

    setActionResult({
      type: "success",
      message: "Category has been successfully added.",
      isActive: true,
    });
    resetActionResult();
  };

  return (
    <>
      <ActionResult
        type={actionResult.type}
        actionContent={actionResult.message}
        isActive={actionResult.isActive}
      />
      <Card class={classes.addProductCategoryWrapper}>
        <Header headerContent="I want to add" />
        <form className={classes.addProductCategoryForm}>
          <div className={classes.singleRadioInput}>
            <label htmlFor="product">Product</label>
            <input
              type="radio"
              id="product"
              name="add"
              value="product"
              onInput={productInputHandler}
            />
          </div>
          <div className={classes.singleRadioInput}>
            <label htmlFor="category">Category</label>
            <input
              type="radio"
              id="category"
              name="add"
              value="category"
              onInput={categoryInputHandler}
            />
          </div>
        </form>
        {selectedAction === "product" && (
          <form
            onSubmit={productFormSubmitHandler}
            className={classes.addProductForm}
          >
            <UserInput
              class=""
              type="text"
              for="productName"
              label="Product Name"
              id="productName"
              name="productName"
              placeholder="e.g. Cisowianka"
              inputRef={productNameInputRef}
            />
            <UserInput
              class=""
              type="select"
              for="productCategory"
              label="Product Category"
              id="pproductCategory"
              name="productCategory"
              inputRef={productCategoryInputRef}
            />
            <SubmitButton buttonContent="Add" />
          </form>
        )}
        {selectedAction === "category" && (
          <form
            onSubmit={categoryFormSubmitHandler}
            className={classes.addCategoryForm}
          >
            <UserInput
              class=""
              type="text"
              for="category"
              label="Category Name"
              id="category"
              name="category"
              placeholder="e.g. Football"
              inputRef={categoryNameInputRef}
            />
            <SubmitButton buttonContent="Add" />
          </form>
        )}
      </Card>
    </>
  );
};

export default AddProductOrCategory;

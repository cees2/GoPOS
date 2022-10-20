import classes from "./AddProductOrCategory.module.css";
import Card from "../UI/Card";
import SubmitButton from "../UI/SubmitButton";
import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import useHttp from "../../hooks/use-http";
import CategoryOption from "../Products/UpdateProduct/CategoryOption";

const AddProductOrCategory = () => {
  const [selectedAction, setSelectedAction] = useState("");
  const categories = useSelector((state) => state.categories.categories);
  const productNameInputRef = useRef();
  const productCategoryInputRef = useRef();
  const categoryNameInputRef = useRef();
  const { getCategories, addCategory, addProduct, getProducts } = useHttp();

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
      alert("Please provide a product name.");
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

    await addProduct(productToBeAdded);

    await getProducts();
  };

  const categoryFormSubmitHandler = async (e) => {
    e.preventDefault();
    const categoryName = categoryNameInputRef.current.value;

    const { data: fetchedCategories } = await getCategories();

    if (
      fetchedCategories.some(
        (category) => category.name.toUpperCase() === categoryName.toUpperCase()
      )
    ) {
      alert("This category already exist.");
      return;
    }
    try {
      await addCategory(categoryName);

      await getCategories();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Card class={classes.addProductCategoryWrapper}>
      <h3 className={classes.addProductCategoryHeader}>I want to add</h3>
      <form className={classes.addProductCategoryForm}>
        <div className={classes.signleRadioInput}>
          <label htmlFor="product">Product</label>
          <input
            type="radio"
            id="product"
            name="add"
            value="product"
            onInput={productInputHandler}
          />
        </div>
        <div className={classes.signleRadioInput}>
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
          <div className={classes.singleInput}>
            <label htmlFor="productName">Product Name</label>
            <input
              id="productName"
              name="productName"
              placeholder="e.g. Cisowianka"
              ref={productNameInputRef}
            />
          </div>
          <div className={classes.singleInput}>
            <label htmlFor="productCategory">Product Category</label>
            <select
              id="productCategory"
              name="productCategory"
              ref={productCategoryInputRef}
            >
              {categories.map((category, i) => (
                <CategoryOption key={i} categoryName={category.name} />
              ))}
            </select>
          </div>
          <SubmitButton buttonContent="Add" />
        </form>
      )}
      {selectedAction === "category" && (
        <form
          onSubmit={categoryFormSubmitHandler}
          className={classes.addCategoryForm}
        >
          <div className={classes.singleInput}>
            <label htmlFor="Category">Category Name</label>
            <input
              id="Category"
              name="Category"
              placeholder="e.g. Football"
              ref={categoryNameInputRef}
            />
          </div>
          <SubmitButton buttonContent="Add" />
        </form>
      )}
    </Card>
  );
};

export default AddProductOrCategory;

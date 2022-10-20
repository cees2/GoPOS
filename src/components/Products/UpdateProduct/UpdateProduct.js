import Card from "../../UI/Card";
import SubmitButton from "../../UI/SubmitButton";
import { useSelector } from "react-redux";
import { useRef } from "react";
import useHttp from "../../../hooks/use-http";
import CategoryOption from "./CategoryOption";
import classes from "./UpdateProduct.module.css";

const UpdateProduct = () => {
  const categories = useSelector((state) => state.categories.categories);
  const products = useSelector((state) => state.products.products);
  const oldProductNameInputRef = useRef();
  const oldProductCategoryInputRef = useRef();
  const newProductNameInputRef = useRef();
  const newProductCategoryInputRef = useRef();
  const { getProducts, getOneProduct, getOneCategory, updateProduct } =
    useHttp();

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
      alert("Fill in every input");
      return;
    }

    if (!oldProduct) {
      alert("This product does not exist.");
      return;
    }

    //Checking if product with that category exist:

    const { id: oldProductId } = oldProduct;

    const { data: fetchedOldProduct } = await getOneProduct(oldProductId);

    if (fetchedOldProduct.name.toUpperCase() !== oldProductName.toUpperCase()) {
      alert("This product does not exist in our DB");
      return;
    }

    const fetchedOldCategory = getOneCategory(oldProductId);

    if (!fetchedOldCategory) {
      alert("This category does not exist in our DB");
      return;
    }

    const { id: oldCategoryId } = categories.find(
      (category) => category.name === oldProductCategory
    );

    if (fetchedOldProduct.category_id !== oldCategoryId) {
      alert("Incorrect category");
      return;
    }

    // When compilator reaches this point --> old product & category is ok

    const newProduct = { ...fetchedOldProduct };
    newProduct.name = newProductName;
    newProduct.category_id = categories.find(
      (category) => category.name === newProductCategory
    ).id;

    await updateProduct(fetchedOldProduct.id, newProduct);

    await getProducts();

    console.log("KOniec", products);
  };

  return (
    <Card class={classes.updateProductWrapper}>
      <h3 className={classes.changeProductHeader}>Change product</h3>
      <form onSubmit={formSubmitHandler} className={classes.updateProductForm}>
        <div className={classes.singleTextInput}>
          <label htmlFor="productName">Old Product Name</label>
          <input
            id="oldProductName"
            name="oldProductName"
            placeholder="e.g. Cisowianka"
            ref={oldProductNameInputRef}
          />
        </div>
        <div className={classes.singleSelectInput}>
          <label htmlFor="productCategory">Old Product Category</label>
          <select
            id="oldProductCategory"
            name="oldProductCategory"
            ref={oldProductCategoryInputRef}
          >
            {categories.map((category, i) => (
              <CategoryOption key={i} categoryName={category.name} />
            ))}
          </select>
        </div>
        <div className={classes.singleTextInput}>
          <label htmlFor="productName">New Product Name</label>
          <input
            id="newProductName"
            name="newProductName"
            placeholder="e.g. Cisowianka"
            ref={newProductNameInputRef}
          />
        </div>
        <div className={classes.singleSelectInput}>
          <label htmlFor="productCategory">New Product Category</label>
          <select
            id="newProductCategory"
            name="ewnProductCategory"
            ref={newProductCategoryInputRef}
          >
            {categories.map((category, i) => (
              <CategoryOption key={i} categoryName={category.name} />
            ))}
          </select>
        </div>
        <SubmitButton buttonContent="Submit" />
      </form>
    </Card>
  );
};

export default UpdateProduct;

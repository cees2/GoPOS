import React, { useRef } from "react";
import classes from "./UpdateCategory.module.css";
import Card from "../UI/Card";
import SubmitButton from "../UI/SubmitButton";
import { useSelector } from "react-redux";
import CategoryOption from "../Products/UpdateProduct/CategoryOption";
import useHttp from "../../hooks/use-http";

const UpdateCategory = () => {
  const oldCategoryInputRef = useRef();
  const newCategoryInputRef = useRef();
  const categories = useSelector((state) => state.categories.categories);
  const { getOneCategory, updateCategory, getCategories } = useHttp();

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    const newCategoryName = newCategoryInputRef.current.value.trim();
    const oldCategoryName = oldCategoryInputRef.current.value;

    if (!newCategoryName) {
      alert("New category input can not be empty.");
      return;
    }

    if (newCategoryName === oldCategoryName) {
      alert("New category input can not be the same as old one  .");
      return;
    }

    const category = categories.find(
      (category) => category.name === oldCategoryName
    );

    //Checking if such category exists of backend side
    let categoryExists = false;
    try {
      await getOneCategory(category.id);

      categoryExists = true;
    } catch (err) {
      alert(err.message);
    }

    if (!categoryExists) {
      alert("This category does not exist.");
      return;
    }

    const newCategory = { ...category };

    newCategory.name = newCategoryName;

    await updateCategory(category.id, newCategory);

    await getCategories();
  };

  return (
    <Card class={classes.updateCategoryWrapper}>
      <h3 className={classes.updateCategoryHeader}>Update category</h3>
      <form onSubmit={formSubmitHandler} className={classes.updateCategoryForm}>
        <div className={classes.singleInput}>
          <label htmlFor="productCategory">Product Category</label>
          <select
            id="productCategory"
            name="productCategory"
            ref={oldCategoryInputRef}
          >
            {categories.map((category, i) => (
              <CategoryOption key={i} categoryName={category.name} />
            ))}
          </select>
        </div>
        <div className={classes.singleInput}>
          <label htmlFor="productCategory">New category name</label>
          <input
            id="productCategory"
            name="productCategory"
            ref={newCategoryInputRef}
          />
        </div>
        <SubmitButton buttonContent="Submit" />
      </form>
    </Card>
  );
};

export default UpdateCategory;

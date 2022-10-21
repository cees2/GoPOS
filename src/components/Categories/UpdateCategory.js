import React, { useRef, useState } from "react";
import classes from "./UpdateCategory.module.css";
import Card from "../UI/Card";
import SubmitButton from "../UI/SubmitButton";
import { useSelector } from "react-redux";
import useHttp from "../../hooks/use-http";
import Header from "../UI/Header";
import UserInput from "../UI/UserInput";
import ActionResult from "../UI/ActionResult";

const UpdateCategory = () => {
  const [actionResult, setActionResult] = useState("");
  const oldCategoryInputRef = useRef();
  const newCategoryInputRef = useRef();
  const categories = useSelector((state) => state.categories.categories);
  const { getOneCategory, updateCategory, getCategories } = useHttp();

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

    const newCategoryName = newCategoryInputRef.current.value.trim();
    const oldCategoryName = oldCategoryInputRef.current.value;

    if (!newCategoryName) {
      setAction("error", "New category input can not be empty.");
      return;
    }

    if (newCategoryName === oldCategoryName) {
      setAction("error", "New category input can not be the same as old one.");
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
      setAction("error", err.message);
    }

    if (!categoryExists) {
      setAction("error", "This category does not exist.");
      return;
    }

    const newCategory = { ...category };

    newCategory.name = newCategoryName;

    try {
      await updateCategory(category.id, newCategory);
    } catch (err) {
      setAction("error", err.message);
      return;
    }

    await getCategories();

    setAction("success", "Category has been successfully changed.");
  };

  return (
    <>
      <ActionResult
        type={actionResult.type}
        actionContent={actionResult.message}
        isActive={actionResult.isActive}
      />
      <Card class={classes.updateCategoryWrapper}>
        <Header headerContent="Update  category" />
        <form
          onSubmit={formSubmitHandler}
          className={classes.updateCategoryForm}
        >
          <UserInput
            class=""
            type="select"
            for="productCategory"
            label="Product Category"
            id="productCategory"
            name="productCategory"
            inputRef={oldCategoryInputRef}
          />
          <UserInput
            class=""
            type="text"
            for="newCategory"
            label="New category name"
            id="newCategory"
            name="newCategory"
            inputRef={newCategoryInputRef}
          />
          <SubmitButton buttonContent="Submit" />
        </form>
      </Card>
    </>
  );
};

export default UpdateCategory;

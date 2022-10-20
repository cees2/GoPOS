import React from "react";
import classes from "./CategoryOption.module.css";

const CategoryOption = (props) => {
  return <option>{props.categoryName}</option>;
};

export default CategoryOption;

import React from "react";
import classes from "./SingleCategory.module.css";

const SingleCategory = (props) => {
  return <li className={classes.categoryListItem}>{props.categoryName}</li>;
};

export default SingleCategory;

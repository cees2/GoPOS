import React from "react";
import classes from "./SingleProduct.module.css";

const AddOneProduct = (props) => {
  const { productName, productCategory } = props;
  return (
    <li className={classes.productNameList}>
      <span className={classes.productNameSpan}>{productName}</span>
      <span>{productCategory}</span>
    </li>
  );
};

export default AddOneProduct;

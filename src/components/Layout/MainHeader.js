import React from "react";
import classes from "./MainHeader.module.css";
import { Link } from "react-router-dom";

const MainHeader = () => {
  return (
    <header className={classes.appHeader}>
      <h2>Recruitment task</h2>
      <ul className={classes.appHeaderList}>
        <Link to="/products">
          <li>Products</li>
        </Link>
        <Link to="/categories">
          <li>Categories</li>
        </Link>
        <Link to="/edit-product">
          <li>Edit Product</li>
        </Link>
        <Link to="/edit-category">
          <li>Edit Category</li>
        </Link>
        <Link to="/add-product">
          <li>Add Product/Category</li>
        </Link>
      </ul>
    </header>
  );
};

export default MainHeader;

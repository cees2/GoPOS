import React from "react";
import classes from "./Header.module.css";

const Header = (props) => {
  const headerClasses = `${classes.header} ${props.class}`;

  return <h3 className={headerClasses}>{props.headerContent}</h3>;
};

export default Header;

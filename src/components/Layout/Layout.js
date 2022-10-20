import React from "react";
import MainHeader from "./MainHeader";
import classes from "./Layout.module.css";

const Layout = ({ children }) => {
  return (
    <div className={classes.appWrapper}>
      <MainHeader />
      <main className={classes.appMain}>{children}</main>
    </div>
  );
};

export default Layout;

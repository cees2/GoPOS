import React from "react";
import classes from "./ActionResult.module.css";
import error from "./../../images/error.svg";
import checkmark from "./../../images/checkmark.svg";

const ActionResult = (props) => {
  const actionClasses = `${classes.actionWrapper} ${
    props.type === "success" ? classes.success : classes.error
  } ${props.isActive ? classes.activeAction : ""} ${props.class}`;

  return (
    <div className={actionClasses}>
      {props.type === "error" && <img src={error} alt="error" />}
      {props.type === "success" && <img src={checkmark} alt="checkmark" />}
      {props.actionContent}
    </div>
  );
};

export default ActionResult;

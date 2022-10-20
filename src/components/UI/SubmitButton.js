import React from "react";
import classes from "./SubmitButton.module.css";

const SubmitButton = (props) => {
  const buttonClasses = `${classes.submitButton} ${props.class}`;

  return <button className={buttonClasses}>{props.buttonContent}</button>;
};

export default SubmitButton;

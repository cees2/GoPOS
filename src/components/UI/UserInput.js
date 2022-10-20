import React from "react";
import classes from "./UserInput.module.css";
import { useSelector } from "react-redux";
import CategoryOption from "../Products/UpdateProduct/CategoryOption";

const UserInput = (props) => {
  const categories = useSelector((state) => state.categories.categories);

  const inputClasses = `${classes.userInput} ${props.class}`;

  return (
    <div className={inputClasses}>
      <label htmlFor={props.for}>{props.label}</label>
      {props.type === "text" && (
        <input
          id={props.id}
          name={props.name}
          placeholder={props.placeholder}
          ref={props.inputRef}
        />
      )}
      {props.type === "select" && (
        <select id={props.id} name={props.name} ref={props.inputRef}>
          {categories.map((category, i) => (
            <CategoryOption key={i} categoryName={category.name} />
          ))}
        </select>
      )}
    </div>
  );
};

export default UserInput;

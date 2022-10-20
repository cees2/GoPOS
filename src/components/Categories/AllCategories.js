import classes from "./AllCategories.module.css";
import Card from "../UI/Card";
import SingleCategory from "./SingleCategory";
import { useSelector } from "react-redux";

const AllCategories = () => {
  const categories = useSelector((state) => state.categories.categories);

  return (
    <Card class={classes.categoriesListWrapper}>
      <h3 className={classes.categoriesListHeader}>List of categories</h3>
      <ul className={classes.listOfAllCategories}>
        {categories.map((category, i) => (
          <SingleCategory key={i} categoryName={category.name} />
        ))}
      </ul>
    </Card>
  );
};

export default AllCategories;

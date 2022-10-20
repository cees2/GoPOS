import classes from "./AllCategories.module.css";
import Card from "../UI/Card";
import Header from "../UI/Header";
import SingleCategory from "./SingleCategory";
import { useSelector } from "react-redux";

const AllCategories = () => {
  const categories = useSelector((state) => state.categories.categories);

  return (
    <Card class={classes.categoriesListWrapper}>
      <Header headerContent="List of categories" />
      <ul className={classes.listOfAllCategories}>
        {categories.map((category, i) => (
          <SingleCategory key={i} categoryName={category.name} />
        ))}
      </ul>
    </Card>
  );
};

export default AllCategories;

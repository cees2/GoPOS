import classes from "./AllProducts.module.css";
import Card from "../../UI/Card";
import SingleProduct from "./SingleProduct";
import { useSelector } from "react-redux";

const AllProducts = () => {
  const products = useSelector((state) => state.products.products);
  const categories = useSelector((state) => state.categories.categories);

  return (
    <Card class={classes.productListWrapper}>
      <h3 className={classes.productsListHeader}>List of products</h3>
      <ul className={classes.listOfAllProducts}>
        <SingleProduct productName="Name" productCategory="Category" />
        {products.map((product, i) => (
          <SingleProduct
            key={i}
            productName={product.name}
            productCategory={
              categories.find((category) => category.id === product.category_id)
                .name
            }
          />
        ))}
      </ul>
    </Card>
  );
};

export default AllProducts;

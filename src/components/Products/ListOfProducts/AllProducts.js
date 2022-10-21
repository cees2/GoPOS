import classes from "./AllProducts.module.css";
import Card from "../../UI/Card";
import SingleProduct from "./SingleProduct";
import { useSelector } from "react-redux";
import Header from "../../UI/Header";

const AllProducts = () => {
  const products = useSelector((state) => state.products.products);
  const categories = useSelector((state) => state.categories.categories);

  return (
    <Card class={classes.productListWrapper}>
      <Header headerContent="List of products" />
      <ul className={classes.listOfAllProducts}>
        <SingleProduct productName="Name" productCategory="Category" />
        {products.map((product, i) => (
          <SingleProduct
            key={i}
            productName={product.name}
            productCategory={
              categories.find((category) => category.id === product.category_id)
                ?.name || "Invalid category"
            }
          />
        ))}
      </ul>
      <p className={classes.totalProducts}>
        Products in total:
        <strong>
          <i>{products.length}</i>
        </strong>
      </p>
    </Card>
  );
};

export default AllProducts;

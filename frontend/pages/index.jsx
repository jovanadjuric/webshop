import Page from "../components/Page";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../lib/products";

export async function getStaticProps() {
  const products = await getProducts();
  return {
    props: { products },
    revalidate: parseInt(process.env.REVALIDATE_SECONDS),
  };
}

function HomePage({ products }) {
  return (
    <>
      <Page title="Home">
        <ul className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </Page>
    </>
  );
}

export default HomePage;

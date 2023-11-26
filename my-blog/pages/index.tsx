import DefaultLayout from "@/components/layouts/DefaultLayout";
import { IProduct } from "@/types/FakeAPI";
import Head from "next/head";
import Link from "next/link";

interface HomeProps {
  products: IProduct[];
}

const Home: React.FC<HomeProps> = ({ products }) => {
  return (
    <DefaultLayout>
      <Head>
        <title>Trang chủ</title>
      </Head>

      <div>
        <h2 className="text-2xl font-bold">Danh sách sản phẩm</h2>
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              <Link href={`/products/${product._id}`}>{product.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </DefaultLayout>
  );
};

// This gets called on every request
export async function getServerSideProps() {
  try {
    const res = await fetch("http://localhost:8080/api/v1/articles");
    const data = await res.json();

    // Assuming the array of products is in the 'data' property
    const products = data.data;

    return { props: { products } };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { props: { products: [] } };
  }
}

export default Home;

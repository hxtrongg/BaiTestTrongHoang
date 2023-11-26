// pages/products/index.tsx
import DefaultLayout from "@/components/layouts/DefaultLayout";
import { IProduct } from "@/types/FakeAPI";
import Link from "next/link";
import Head from 'next/head';

export default function Products({ products }: { products: IProduct[] }) {
  return (
    <DefaultLayout>
      <Head>
        <title>Danh sách sản phẩm</title>
      </Head>
      <h1 className="text-2xl font-bold">Products Page</h1>

      <ul>
        {products.map((item) => (
          <li key={item._id}>
            <Link href={`/products/${item._id}`}>
              <span>ID: {item._id} - {item.title} </span>
            </Link>
          </li>
        ))}
      </ul>
    </DefaultLayout>
  );
}

// This function gets called at build time
export async function getStaticProps() {
  try {
    // Call the local API endpoint to get products
    const res = await fetch('http://localhost:8080/api/v1/articles');
    const data = await res.json();

    // Assuming the array of products is in the 'data' property
    const products: IProduct[] = data.data;

    return {
      props: {
        products,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        products: [],
      },
    };
  }
}

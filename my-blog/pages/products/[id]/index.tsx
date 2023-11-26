import { useRouter } from "next/router";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import { IProduct } from "@/types/FakeAPI";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";

interface ProductsDetailsProps {
  product: IProduct;
}

export default function ProductsDetails({ product }: ProductsDetailsProps) {
  const router = useRouter();
  console.log('Product Data:', product);

  return (
    <DefaultLayout>
      chi tiết sản phẩm: {router.query.id}
      <Head>
        <title>
          {Array.isArray(product.title)
            ? product.title.join(" ")
            : product.title}
        </title>
      </Head>
      <div>
        <strong>{product.title}</strong>
      </div>

      <div>
        <strong>keyword:</strong> <span> {product.keyword}</span>
      </div>

      <div>
        <strong>description: </strong><span>{product.description}</span>
      </div>

      <div>
        <strong>content: </strong><span>{product.content}</span>
      </div>

      <div>
        <strong>date: </strong><span>{product.date}</span>
      </div>
    </DefaultLayout>
  );
}

export const getStaticProps: GetStaticProps<ProductsDetailsProps> = async ({ params }) => {
  if (!params || typeof params.id !== "string") {
    return {
      notFound: true,
    };
  }

  try {
    const res = await fetch(`http://localhost:8080/api/v1/articles/${params.id}`);
    const data = await res.json();

    if (!data || !data.data) {
      return {
        notFound: true,
      };
    }

    const product: IProduct = data.data;

    return {
      props: {
        product,
      },
      revalidate: 5,
    };
  } catch (error) {
    console.error("Error fetching product data:", error);
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const res = await fetch("http://localhost:8080/api/v1/articles");
    const data = await res.json();
    const products: IProduct[] = Array.isArray(data.data) ? data.data : [];

    const paths = products.map((product) => ({
      params: { id: product._id.toString() },
    }));

    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    console.error("Error fetching product IDs:", error);
    return {
      paths: [],
      fallback: false,
    };
  }
};

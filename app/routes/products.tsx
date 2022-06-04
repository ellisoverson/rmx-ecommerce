import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { getAllProducts } from "~/models/product.server";
import { useUser } from "~/utils";

type LoaderData = {
  products: Awaited<ReturnType<typeof getAllProducts>>;
};

export const loader: LoaderFunction = async () => {
  const products = await getAllProducts();
  return json<LoaderData>({ products });
};

export default function ProductsPage() {
  const { products } = useLoaderData() as LoaderData;
  const user = useUser();

  console.log("user", user);

  return (
    <main>
      <h1>Products</h1>
      {products.map(({ name, price, image, id }) => (
        <div key={id}>
          <h3>{name}</h3>
          <div>${price}</div>
          <img src={image} alt={name} />
        </div>
      ))}
      <Outlet />
    </main>
  );
}

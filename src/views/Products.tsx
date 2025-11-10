import { Link, useLoaderData, type ActionFunctionArgs } from "react-router-dom";
import { getProducts, updatedProductAvailability } from "../services/ProductService";
import ProductDetails from "../components/productDetails";
import type { Product } from "../types";

export async function loader() {
  const datos = await getProducts()
  return datos
}

export async function action({request}:ActionFunctionArgs) {
  // extraer los datos del fetcher.form 
  const data = Object.fromEntries(await request.formData())
  await updatedProductAvailability(+data.id)
  return {}
}

export default function Products() {
  // para recuperar la informacion de los loaders usa useLoaderData
  const products = useLoaderData() as Product[]
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500 ">Productos</h2>
        <Link to="producto/nuevo" className="text-white rounded-md bg-indigo-600 p-3 text-sm hover:bg-indigo-500">Agregar Producto</Link>
      </div>   

      <div className="p-2 overflow-auto">
        <table className="w-full mt-5 table-auto">
          <thead className="bg-slate-800 text-white">
              <tr>
                  <th className="p-2">Producto</th>
                  <th className="p-2">Precio</th>
                  <th className="p-2">Disponibilidad</th>
                  <th className="p-2">Acciones</th>
              </tr>
          </thead>
          <tbody>
            {products.map(product=>(
              <ProductDetails
                key={product.id}
                product={product}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

import { Link, Form, useActionData, type ActionFunctionArgs, redirect, type LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import ErrorMessage from "../components/ErrorMesagge";
import { getProductById, updateProduct } from "../services/ProductService";
import type { Product } from "../types";
import ProductForm from "../components/ProductForm";

export async function loader({params}: LoaderFunctionArgs) {
    if (params.id !== undefined) {
        const producto = await getProductById(+params.id)
        if(!producto){return redirect('/')}
        return producto
    }
}

// esta funcion para que se ejecute debe ser mandada a llamar desde el router
export async function action({request, params}:ActionFunctionArgs) {
    // extraer los datos del Form
    const data = Object.fromEntries(await request.formData())
    let error = ''
    if (Object.values(data).includes('')) {
        error = 'Todos los campos son obligatorios madafak'
    }
    if (error.length) {
        // en el momento en el que retornas algo desde los actions, esta informacion esta disponible de vuelta en el componente por medio del hook useActionData
        return error
    }
    // mandamos el producto a la base de datos
    if (params.id !== undefined) {
        await updateProduct(data,+params.id)
        // en todos los actions debes retornar algo
        return redirect('/') //retornamos al usuario a la pagina principal
    }
}

const availabilityOptions = [
   { name: 'Disponible', value: true},
   { name: 'No Disponible', value: false}
]

export default function EditProduct() {
  const product = useLoaderData() as Product
  const error = useActionData() as string
  
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500 ">Editar Producto</h2>
        <Link to="/" className="text-white rounded-md bg-indigo-600 p-3 text-sm hover:bg-indigo-500">Volver Productos</Link>
      </div>   
      {error&&<ErrorMessage>{error}</ErrorMessage>}
      <Form className="mt-10" method="POST">
            
            <ProductForm
                product={product}
            />

            <div className="mb-4">
                <label
                    className="text-gray-800"
                    htmlFor="availability"
                >Disponibilidad:</label>
                <select 
                    id="availability"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    name="availability"
                    defaultValue={product?.availability.toString()}
                >
                    {availabilityOptions.map(option => (
                    <option key={option.name} value={option.value.toString()}>{option.name}</option>
                    ))}
                </select>
            </div>

            <input
            type="submit"
            className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
            value="Guardar Cambios"
            />
       </Form>
    </>
  )
}

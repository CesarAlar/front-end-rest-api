import { Link, Form, useActionData, type ActionFunctionArgs, redirect } from "react-router-dom";
import ErrorMessage from "../components/ErrorMesagge";
import { addProduct } from "../services/ProductService";
import ProductForm from "../components/ProductForm";

// esta funcion para que se ejecute debe ser mandada a llamar desde el router
export async function action({request}:ActionFunctionArgs) {
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
    await addProduct(data)
    // en todos los actions debes retornar algo
    return redirect('/') //retornamos al usuario a la pagina principal
}

export default function NewProduct() {
  const error = useActionData() as string
  
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500 ">Registrar Producto</h2>
        <Link to="/" className="text-white rounded-md bg-indigo-600 p-3 text-sm hover:bg-indigo-500">Volver Productos</Link>
      </div>   
      {error&&<ErrorMessage>{error}</ErrorMessage>}
      <Form className="mt-10" method="POST">
            <ProductForm/>
            <input
            type="submit"
            className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
            value="Registrar Producto"
            />
       </Form>
    </>
  )
}

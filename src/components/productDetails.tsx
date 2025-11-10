import { Form, redirect, useFetcher, useNavigate, type ActionFunctionArgs } from "react-router-dom"
import type { Product } from "../types"
import { formatCurrency } from "../utils"
import { deleteProduct } from "../services/ProductService"

type productDetailsProps = {
    product: Product
}

export async function action({params}: ActionFunctionArgs) {
    if (params.id !== undefined) {
        await deleteProduct(+params.id)
        return redirect('/')
    }
}

export default function ProductDetails({product}: productDetailsProps) {
  const fetcher = useFetcher()
  const navigate = useNavigate()
  const disponible = product.availability
  return (
    <>
        <tr className="border-b ">
        <td className="p-3 text-lg text-gray-800">
            {product.name}
        </td>
        <td className="p-3 text-lg text-gray-800">
            {formatCurrency(product.price)}
        </td>
        <td className="p-3 text-lg text-gray-800">
            {/* fetcher sirve para hacer interacciones y mantenerte en la misma pagina y conectar con react-router-dom este boton ejecuta el action que esta en Products.tsx ya que los actions trabajan bajo la misma url y este componente esta dentro de la misma que Products*/}
            <fetcher.Form method="POST">
                <button 
                    type="submit"
                    name="id"
                    value={product.id}
                    className={`${disponible ? 'text-black' : 'text-red-600'} rounded-lg p-2 text-xs uppercase font-bold w-full border border-black hover:cursor-pointer`}
                >
                    {disponible? 'Disponible' : 'No disponible'}
                </button>
            </fetcher.Form>
        </td>
        <td className="p-3 text-lg text-gray-800 ">
           <div className="flex gap-2 items-center">
              <button 
              onClick={()=> navigate(`/productos/${product.id}/editar`)}
              className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
              >Editar</button>
                {/* se usa Form que es de react-router-don es para definir la accion porque se va a eliminar un registro */}
              <Form className="w-full" method="POST" action={`productos/${product.id}/eliminar`} >
                <input type="submit" value={'Eliminar'} className="bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"/>
              </Form>
           </div>
        </td>
    </tr> 
    </>
  )
}

import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Products, { action as productsAction, loader as productsLoader } from "./views/Products";
import NewProduct, {action as NewProductAction} from "./views/NewProduct";
import EditProduct, {loader as EditProductLoader, action as EditProductAction} from "./views/EditProduct";
import { action as productDetailsAction } from "./components/productDetails";
// en este router vas declarando tus rutas en un arreglo y defines las rutas en un objeto
export const router = createBrowserRouter([
  {
   path:'/',
   element: <Layout/>,
    // lo que va a hacer children es que las paginas que esten dentro del arreglo sean los hijos de este layout y el contenido se inyecta en el outlet y los hijos se definen con un objeto
    children:[
      {
        index:true,
        element:<Products/>,
        // se manda a llamar antes de que el componente este listo
        loader: productsLoader,
        action: productsAction
      },
      {
        path: 'producto/nuevo',
        element: <NewProduct/>,
        // aqui es donde el Form manda a llamar la funcion action
        action: NewProductAction
      },
      {
        path: 'productos/:id/editar', //ROA PATTERN - Resource-Oriented desing
        element: <EditProduct/>,
        loader: EditProductLoader,
        action: EditProductAction
      },
      {
        path: 'productos/:id/eliminar', //creamos esta ruta porque vamos a eliminar el producto por medio de via actions y se necesita
        // para que se ejecute el action debes agregar uno en el form de productDetails de esta manera
        // action={`productos/${product.id}/eliminar`}
        action: productDetailsAction
      }
    ] 
  }
])
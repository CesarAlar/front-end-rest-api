import { safeParse } from "valibot";
import { DraftProductValibot, ProductsSchema, ProductValibot, type Product,} from "../types"
import axios from "axios";
import { toBoolean } from "../utils";
type addProductProps = {
    [k: string]: FormDataEntryValue;
}
export async function addProduct(data: addProductProps) {
    try {
        const result = safeParse(DraftProductValibot,{
            name : data.name,
            price: +data.price
        })
        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products`
            await axios.post(url,{
                name : result.output.name,
                price : result.output.price,
            })
        } else {
            throw new Error('Datos no validos')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getProducts(){
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`
        const {data} = await axios(url)
        const result = safeParse(ProductsSchema,data.data)
        if(result.success){return result.output}else{ throw new Error('hubo un error')}
        // return data
    } catch (error) {
        console.log(error)
    }
}

export async function getProductById(id:Product['id']){
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        const {data} = await axios(url)
        const result = safeParse(ProductValibot,data.data)
        if(result.success){return result.output}else{ throw new Error('hubo un error')}
        // return data
    } catch (error) {
        console.log(error)
    }
}

export async function updateProduct(data : addProductProps, id: Product['id']) {
    try {
        const result = safeParse(ProductValibot,{
            id,
            name: data.name,
            price: +data.price,
            availability: toBoolean(data.availability.toString())
        })
        if(result.success){
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
            await axios.put(url,result.output)
        }
    } catch (error) {
        console.log(error)
        
    }
}

export async function deleteProduct(id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.delete(url)
    } catch (error) {
        console.log(error)
    }
}

export async function updatedProductAvailability(id: Product['id']) {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
    await axios.patch(url)
}
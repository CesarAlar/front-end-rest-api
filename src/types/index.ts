import {object, string, number, boolean,type InferOutput, array} from 'valibot'
export const DraftProductValibot = object({
    name: string(),
    price: number(),
})

export const ProductValibot = object({
    id: number(),
    name: string(),
    price: number(),
    availability: boolean(),
})
export const ProductsSchema = array(ProductValibot)
export type Product = InferOutput<typeof ProductValibot>
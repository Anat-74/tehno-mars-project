import type { Product } from "../types/types"

export const useAddToCart = (product: Product) => {
   const cartStore = useCartStore()
   const productData = {
       category: product.category?.name || '',
       id: product.id,
       name: product.name,
       description: product.description || '',
       image: product.image?.[0]?.url || '',
       price: product.price || 0,
     }
     cartStore.addToCart(productData)
}
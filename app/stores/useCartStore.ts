import type { Product } from "../types/types"

// export type CartItem = {
//   product: Product & {
//     categorySlug: string
//     subcategorySlug: string
//     image: string
//   }
//   quantity: number
// }

export type CartProduct = Omit<Product, 'image'> & {
   image: string // Только URL
   categorySlug: string
   subcategorySlug: string
 }
 
 export type CartItem = {
   product: CartProduct
   quantity: number
 }
 
export const useCartStore = defineStore('cart', () => {
   const items = ref<CartItem[]>([])

   const totalItems = computed(() => 
      items.value.reduce((total, item) => total + item.quantity, 0)
   )

   const totalPrice = computed(() => {
     const total = items.value.reduce((total, item) => total + item.product.price * item.quantity, 0)
      return total.toFixed(2)
   })

   const addToCart = (
      product: Product,
      categorySlug: string,
      subcategorySlug: string
    ) => {
      const existingItem = items.value.find(item => item.product.id === product.id)
      
      // Нормализация изображения
      const normalizedImage = typeof product.image === 'string' 
        ? product.image 
        : Array.isArray(product.image) 
          ? product.image[0]?.url || ''
          : ''
  
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        items.value.push({
          product: {
            ...product,
            image: normalizedImage,
            categorySlug,
            subcategorySlug
          },
          quantity: 1
        })
      }
      saveCart()
    }

   const removeFromCart = (productId: string | number) => {
      items.value = items.value.filter(item => item.product.id !== productId)
      saveCart()
   }

   const updateQuantity = (productId: string | number, quantity: number) => {
      const item = items.value.find(item => item.product.id === productId)
      if (item) {
        const newQuantity = Math.max(1, quantity)
        item.quantity = newQuantity
        saveCart()
      }
    }

   const clearCart = () => {
      items.value = []
      saveCart()
   }

   const saveCart = () => {
      localStorage.setItem('cart', JSON.stringify(items.value))
   }

   const loadCart = () => {
      if (typeof window === 'undefined') return; // Для SSR
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          items.value = JSON.parse(savedCart);
        } catch (e) {
          console.error("Ошибка загрузки:", e);
          localStorage.removeItem('cart');
        }
      }
    }
   return {
      items,
      totalItems,
      totalPrice,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      loadCart
    }
})
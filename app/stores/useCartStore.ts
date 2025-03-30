type CartItem = {
   product: {
      id: number | string
      name: string
      description: string
      image: string
      price: number
      category: string
   }
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

   const addToCart = (product: CartItem['product'], quantity: number = 1) => {
      const existingItem = items.value.find(item => item.product.id === product.id)

      if (existingItem) {
         existingItem.quantity +=quantity
      } else {
         items.value.push({product, quantity})
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
         item.quantity = Math.max(1, Math.round(quantity))
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
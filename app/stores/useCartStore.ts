import { defineStore } from 'pinia';
type CartItem = {
   product: {
      id: number | string
      name: string
      description: string
      image: string
      price: number
   }
   quantity: number
}

export const useCartStore = defineStore('cart', () => {
   const items = ref<CartItem[]>([])
   const isAuthenticated = ref(false)

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
         item.quantity = quantity
         saveCart()
      }
   }

   const clearCart = () => {
      items.value = []
      saveCart()
   }

   const saveCartToServer = async () => {
      if (isAuthenticated.value) {
        await api.saveCart(items.value);
      }
    }
  
    const loadCartFromServer = async () => {
      if (isAuthenticated.value) {
        const savedCart = await api.loadCart();
        items.value = savedCart;
      }
    }
   
   const syncCart = async () => {
      if (isAuthenticated.value) {
        await loadCartFromServer();
      } else {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          items.value = JSON.parse(savedCart);
        }
      }
    }

   const saveCart = () => {
      if (isAuthenticated) {
         saveCartToServer()
      } else {
         localStorage.setItem('cart', JSON.stringify(items.value))
      }
   } 

   watch(isAuthenticated, syncCart)
   watch(items, saveCart, {deep: true})

   return {
      items,
      totalItems,
      totalPrice,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      syncCart
    }
})
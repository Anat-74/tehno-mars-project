import { defineStore } from 'pinia'
import { useStrapi } from '@nuxtjs/strapi'

type Product = {
  id: number | string
   name: string
  description: string
  price: number
  image: string
}

type CartItem = {
  product: Product
  quantity: number
}

export const useCartStore = defineStore('cart', () => {
  const strapi = useStrapi()
  const items = ref<CartItem[]>([])
  const { user } = useStrapiUser()

  // Вычисляемые свойства
  const totalItems = computed(() => 
    items.value.reduce((total, item) => total + item.quantity, 0)
  )

  const totalPrice = computed(() =>
    items.value.reduce((total, item) => 
      total + item.product.price * item.quantity, 0
    ).toFixed(2)
  )

  // Основные методы
  const addToCart = (product: Product, quantity: number = 1) => {
    const existing = items.value.find(item => item.product.id === product.id)
    existing 
      ? existing.quantity += quantity 
      : items.value.push({ product, quantity })
  }

  const removeFromCart = (productId: string | number) => {
    items.value = items.value.filter(item => item.product.id !== productId)
  }

  const updateQuantity = (productId: string | number, newQuantity: number) => {
    const item = items.value.find(item => item.product.id === productId)
    if (item) item.quantity = Math.max(1, newQuantity)
  }

  const clearCart = () => {
    items.value = []
  }

  // Синхронизация с сервером
  const saveCartToServer = async () => {
    try {
      if (user.value) {
        await strapi.update('users', user.value.id, {
          cart: items.value
        })
      }
    } catch (error) {
      console.error('Cart save error:', error)
    }
  }

  const loadCartFromServer = async () => {
    try {
      if (user.value) {
        const { data } = await strapi.find('users/me', { 
          populate: { cart: { populate: ['product'] } }
        })
        items.value = data.cart || []
      }
    } catch (error) {
      console.error('Cart load error:', error)
    }
  }

  // Универсальная синхронизация
  const syncCart = async () => {
    if (user.value) {
      await loadCartFromServer()
    } else {
      const localCart = localStorage.getItem('cart')
      items.value = localCart ? JSON.parse(localCart) : []
    }
  }

  // Автосохранение
  watch(items, (newItems) => {
    if (user.value) {
      saveCartToServer()
    } else {
      localStorage.setItem('cart', JSON.stringify(newItems))
    }
  }, { deep: true })

  watch(user, (newUser) => {
    if (newUser) syncCart()
  })

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
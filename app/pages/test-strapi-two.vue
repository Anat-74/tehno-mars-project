<script setup lang="ts">
import { storeToRefs } from 'pinia'

const { login: strapiLogin, logout: strapiLogout } = useStrapiAuth()
const user = useStrapiUser()
const cartStore = useCartStore()

const isLoading = reactive({
  auth: true,
  login: false,
  products: false
})

const loginData = reactive({
  identifier: '',
  password: ''
})

// Загрузка продуктов с SSR
const { data: products } = await useAsyncData('products', async () => {
  const { data } = await useStrapi().find('products', {
    populate: ['image']
  })
  return data.map((p: any) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    image: p.image?.url || '/placeholder.jpg'
  }))
})

// Обработчики авторизации
const handleLogin = async () => {
  try {
    isLoading.login = true
    await strapiLogin({
      identifier: loginData.identifier,
      password: loginData.password
    })
    await cartStore.syncCart()
  } finally {
    isLoading.login = false
  }
}

const handleLogout = async () => {
  await strapiLogout()
  await cartStore.syncCart()
}

// Инициализация
onMounted(async () => {
  await cartStore.syncCart()
  isLoading.auth = false
})
</script>

<template>
  <div class="cart-wrapper">
    <!-- Блок авторизации -->
    <div class="auth-section">
      <div v-if="isLoading.auth" class="loading">Loading...</div>
      
      <template v-else>
        <form v-if="!user" @submit.prevent="handleLogin">
          <input v-model="loginData.identifier" type="email" placeholder="Email" required>
          <input v-model="loginData.password" type="password" placeholder="Password" required>
          <button :disabled="isLoading.login">
            {{ isLoading.login ? 'Logging in...' : 'Login' }}
          </button>
        </form>
        
        <div v-else class="user-panel">
          <p>Welcome, {{ user.username }}!</p>
          <button @click="handleLogout">Logout</button>
        </div>
      </template>
    </div>

    <!-- Корзина -->
    <div class="cart-content">
      <div v-if="cartStore.items.length === 0">
        Cart is empty
      </div>
      
      <div v-else>
        <div v-for="item in cartStore.items" :key="item.product.id" class="cart-item">
          <img :src="item.product.image" :alt="item.product.name">
          <div class="item-info">
            <h4>{{ item.product.name }}</h4>
            <div class="quantity-controls">
              <input
                type="number"
                min="1"
                :value="item.quantity"
                @change="cartStore.updateQuantity(item.product.id, $event.target.value)"
              >
              <button @click="cartStore.removeFromCart(item.product.id)">Remove</button>
            </div>
            <p>{{ (item.product.price * item.quantity).toFixed(2) }} ₽</p>
          </div>
        </div>
        
        <div class="cart-total">
          <p>Total: {{ cartStore.totalPrice }} ₽</p>
          <button @click="cartStore.clearCart">Clear Cart</button>
        </div>
      </div>
    </div>

    <!-- Список товаров -->
    <div class="products-list">
      <div v-for="product in products" :key="product.id" class="product-card">
        <img :src="product.image" :alt="product.name">
        <h3>{{ product.name }}</h3>
        <p>{{ product.price.toFixed(2) }} ₽</p>
        <button @click="cartStore.addToCart(product)">Add to Cart</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const cartStore = useCartStore()
const config = useRuntimeConfig()

onMounted(() => {
  cartStore.loadCart();
})

console.log('cart',cartStore.items)
</script>

<template>
  <section 
  aria-labelledby="cart-products">
   <h2
      id="cart-products"
      class="visually-hidden">Карзина товаров</h2>
    <ul>
      <li 
      v-for="item in cartStore.items" 
      :key="item.product.id"
      
      >
         <article>
        <h3>{{ item.product.name }}</h3>
        <p>Цена: {{ item.product.price }} ₽</p>
        <p>Количество: {{ item.quantity }}</p>
        <NuxtImg
          :src="`${config.public.strapi.url}${item.product.image}`"
          :alt="item.product.name"
          format="webp"
          width="122"
        />
        <button @click="cartStore.removeFromCart(item.product.id)">Удалить</button>

        <div class="quantity-controls">
        <button 
          @click="cartStore.updateQuantity(item.product.id, item.quantity -1)"
          :disabled="item.quantity <= 1"
        >-</button>
        
        <input 
        type="number" 
         v-model.number="item.quantity" 
         @input="cartStore.updateQuantity(item.product.id, item.quantity)"
         min="1"
        >
        <button 
          @click="cartStore.updateQuantity(item.product.id, item.quantity +1)"
        >+</button>
      </div>
   </article>
      </li>
    </ul>
    <p>Общая сумма: {{ cartStore.totalPrice }} ₽</p>
    <button @click="cartStore.clearCart">Очистить корзину</button>
   </section>
 </template>

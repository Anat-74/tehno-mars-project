<script setup lang="ts">
const cartStore = useCartStore()
const config = useRuntimeConfig()

onMounted(() => {
  cartStore.loadCart();
})
</script>

<template>
    <ul>
      <li 
      v-for="item in cartStore.items" 
      :key="item.product.id"
      >
      <article>
        <h3>{{ item.product.name }}</h3>
        <NuxtImg
          :src="`${config.public.strapi.url}${item.product.image}`"
          :alt="item.product.name"
          format="webp"
          width="122"
        />
        <p>Цена: {{ item.product.price }} ₽</p>
        <p>Количество: {{ item.quantity }}</p>
        <div class="quantity-controls">
        <UButton
         @click="cartStore.updateQuantity(item.product.id, item.quantity -1)"
         :disabled="item.quantity <= 1"
         name-class="remove-quantity-prod"
        />
        <input 
        type="number" 
         v-model.number="item.quantity" 
         @input="cartStore.updateQuantity(item.product.id, item.quantity)"
         min="1"
        >
        <UButton
         @click="cartStore.updateQuantity(item.product.id, item.quantity +1)"
         name-class="add-quantity-prod"
        />
      </div>
        <UButton
        @click="cartStore.removeFromCart(item.product.id)"
        icon="material-symbols:delete-outline-rounded"
        />
   </article>
      </li>
    </ul>
 </template>

<script setup lang="ts">
const cartStore = useCartStore()

const removeFromCart = (productId: string | number) => {
  cartStore.removeFromCart(productId);
}

const updateQuantity = (productId: string | number, quantity: number) => {
  cartStore.updateQuantity(productId, quantity);
}

const clearCart = () => {
  cartStore.clearCart();
}

onMounted(() => {
  cartStore.syncCart();
})
</script>

<template>
   <div>
     <h2>Корзина</h2>
     <ul>
       <li v-for="item in cartStore.items" 
       :key="item.product.id"
       >
         <h3>{{ item.product.name }}</h3>
         <p>Цена: {{ item.product.price }} ₽</p>
         <p>Количество: {{ item.quantity }}</p>
         <button @click="removeFromCart(item.product.id)">Удалить</button>
         <input 
           type="number" 
           v-model.number="item.quantity" 
           @change="updateQuantity(item.product.id, item.quantity)"
         >
       </li>
     </ul>
     <p>Общая сумма: {{ cartStore.totalPrice }} ₽</p>
     <button @click="clearCart">Очистить корзину</button>
   </div>
 </template>
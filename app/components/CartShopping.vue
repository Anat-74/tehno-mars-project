<script setup lang="ts">
const cartStore = useCartStore()
const config = useRuntimeConfig()

onMounted(() => {
  cartStore.loadCart();
})
</script>

<template>
    <ul
   class="cart-item"
    aria-label="Список товаров в корзине"
    >
      <li 
      v-for="item in cartStore.items" 
      :key="item.product.id"
      class="cart-item__item"
      >
        <h3 class="cart-item__title" >{{ item.product.name }}</h3>
        <NuxtImg
          :src="`${config.public.strapi.url}${item.product.image}`"
          :alt="item.product.name"
          format="webp"
          loading="lazy"
          decoding="async"
          width="144"
          height="108"
          class="cart-item__image"
        />
        <span class="cart-item__price">
         <Icon 
            class="cart-item__icon"
            name="my-icon:icon-by-regular" 
             />
         {{ item.product.price }}
      </span>
        <div class="cart-item__controls">
        <UButton
         @click="cartStore.updateQuantity(item.product.id, item.quantity -1)"
         :disabled="item.quantity <= 1"
         name-class="remove-quantity-prod"
         aria-label="Уменьшить количество"
        />
        <label 
            class="visually-hidden"
            for="roduct-quantity"
            >Количество товара
         </label>
        <input 
         v-model.number="item.quantity" 
         @input="cartStore.updateQuantity(item.product.id, item.quantity)"
         min="1"
         type="text"
         id="roduct-quantity"
        >
        <UButton
         @click="cartStore.updateQuantity(item.product.id, item.quantity +1)"
         name-class="add-quantity-prod"
         aria-label="Увеличить количество"
        />
      </div>
        <UButton
        @click="cartStore.removeFromCart(item.product.id)"
        icon="material-symbols:delete-outline-rounded"
        aria-label="Удалить товар из корзины"
        class="cart-item__remove-from-cart"
        />
      </li>
    </ul>
 </template>

 <style lang="scss" scoped>
.cart-item {
&__item {
   display: grid;
   grid-template-columns: auto repeat(3, 1fr);
   justify-items: center;
   align-items: center;
   grid-template-areas: 
   'image title controls price remove'
   'image title controls price remove'
   ;
}

&__title {
   grid-area: title;
}

&__image {
   grid-area: image;
}

&__price {
   grid-area: price;
   font-weight: 600;
   color: var(--primary-color);
}

&__icon {
   translate: 0 toRem(2);
}

&__controls {
   grid-area: controls;
   display: flex;
   align-items: center;
   input {
      width: 28px;
      padding-inline-start: toRem(9);
   }
}

&__remove-from-cart {
   grid-area: remove;
   color: var(--warning-color);
}
}
</style>

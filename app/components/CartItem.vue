<script setup lang="ts">
import type { PropsProduct } from "../types/types";
const props = defineProps<PropsProduct>()

const userStore = useUserStore()

const emit = defineEmits(['selectedRadio'])

let isSelected = ref(false)

const removeFromCart = () => {
   userStore.cart.forEach((prod, index) => {
      if (prod.id === props.id) {
         userStore.cart.splice(index, 1)
      }
   })
}

watch(() => isSelected.value,
   (val) => {
   emit('selectedRadio', {id: props.id, val: val})
})
</script>

<template>
   <article class="cart-item">
   <div
   @click="isSelected = !isSelected"
   :class="['cart-item__circle', {'cart-item__circle_is-selected': isSelected}]"
   role="button"
   >
   </div>
   <NuxtImg
   class="cart-item__image"
   :src="url"
   alt="image"
   format="webp"
   width="90"
   />
   <h3 class="cart-item__title">{{ title }}</h3>
   <span class="cart-item__price">
      <Icon 
      class="icon-bel-ruble"
      name="my-icon:icon-by-regular" />
      {{ price / 100 }}
   </span>
   <UButton
   @click="removeFromCart()"
   name-class="remove-cart-item"
   icon="material-symbols-light:delete-outline-rounded"
   />
</article>
</template>

<style lang="scss" scoped>
.cart-item {
   padding-inline: toRem(9);
   padding-block: toRem(4);
   display: grid;
   grid-template-columns: repeat(3, auto) 1fr;
   align-items: center;
   column-gap: toRem(12);

   &__circle {
      display: inline-flex;
      cursor: pointer;
      padding: toRem(5);
      margin: toRem(-5);

   &::before {
      content: '';
      width: toRem(16);
      height: toRem(16);
      border-radius: 50%;
      border: 1px solid var(--gray-color);
      transition: var(--transtion-duration);
   }

   @include hover {
      &:not(.cart-item__circle_is-selected) {
      &::before {
         border: toRem(3) solid var(--warning-color);
      }
   }
   }

   &_is-selected {
      &::before {
         border: toRem(5) solid var(--danger-color);
         }
      }
   }

   &__image {
      border-radius: toRem(4);
   }

   &__title {
      grid-row: 1/2;
      grid-column: 3/4;
      align-self: start;
      font-size: inherit;
   }

   &__price {
      grid-row: 1/2;
      grid-column: 3/4;
      translate: 0 toRem(4);
   }
}
</style>
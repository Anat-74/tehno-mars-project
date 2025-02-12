<script setup lang="ts">
import type { PropsProduct } from "../types/types";
const props = defineProps<PropsProduct>()

const priceComputed = computed(() => {
   return props.price / 100
})

const oldPriceComputed = computed(() => {
   let res = (props.price + (props.price / 20)) / 100
   return res.toFixed(2)
})
</script>

<template>
   <article
   class="product"
   >
   <h2 class="visually-hidden">Карточка товаров</h2>
   <NuxtLink 
   class="product__link"
   :to="`/item/${id}`">
      <NuxtImg
      class="product__image" 
      :src="url"
      :alt="title"
      format="webp"
      width="344"
      height="211"
      loading="lazy"
      />
   </NuxtLink>
         <div class="product__bg">
         <span class="product__price">
            <Icon
            class="icon-bel-ruble"
            name="my-icon:icon-by-regular"
            />
            {{ priceComputed }}</span>
         <s class="product__old-price">
            <Icon 
            class="icon-bel-ruble"
            name="my-icon:icon-by-regular"
            />
            {{ oldPriceComputed }}</s>
         <span class="product__discount">Скидка 5%</span>
         <p class="product__star">100+ продаж 
            <Icon name="famicons:star-outline" />
            4.7
         </p>
         <h3 class="product__title">{{ title }}</h3>
         <span class="product__delivery">Доставка</span>
      </div>
   </article>
</template>

<style lang="scss" scoped>
.product {

&__image {
   border-radius: toRem(6) toRem(6) 0 0;
}

&__bg {
   display: grid;
   grid-template-columns: auto 1fr;
   align-items: center;
   row-gap: toRem(4);
   padding-inline: toRem(4);
   padding-block: toRem(8);
   border-radius: 0 0 toRem(6) toRem(6);
   background-color: var(--secondary-color);
}

&__price {
   translate: toRem(-2) 0;
   font-weight: 500;
   color: var(--danger-color);
}

&__old-price {
   translate: toRem(-64) 0;
   color: var(--gray-color);
}

&__discount {
   grid-column: 1/2;
   color: var(--danger-color);
}

&__star {
   grid-column: 1/2;
}

&__title {
   grid-column: 1/2;
   margin-block-end: toRem(4);
}

&__delivery {
grid-column: 1/2;
font-weight: 600;
color: var(--sky-blue-color);
}
}

</style>
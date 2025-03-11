<script setup lang="ts">
interface PropsProducts {
   id?: number | string
   name?: string
   price?: number
   url?: string
   description?: string
   category?: string
   slug?: string
}
const props = defineProps<PropsProducts>();

const cartStore = useCartStore()

const addToCart = () => {
   const product = { //типизировать
    id: props.id,
    name: props.name,
    price: props.price,
    description: props.description,
    category: props.category,
    slug: props.slug,
    url: props.url
   }
   cartStore.addToCart(product)
}
</script>

<template>
  <li>
    <h3>{{ name }}</h3>
    <span>Цена: {{ price }} ₽</span>
   <p>Описание: {{ description }}</p>
    <NuxtImg
          :src="url"
          :alt="name"
          format="webp"
          width="122"
        />
        <button @click="addToCart">addToCart</button>
        <h4>{{ category }}</h4>
        <NuxtLink
        :to="`/${slug}`"
        >{{ slug }}</NuxtLink>
  </li>
</template>
<script setup lang="ts">
interface PropsProducts {
   id?: number | string
   name?: string
   price?: number
   url?: string
   description?: string
   uid?: string
}
const props = defineProps<PropsProducts>();

const cartStore = useCartStore()

const addToCart = () => {
   const product = { //типизировать
    id: props.id,
    name: props.name,
    price: props.price,
    description: props.description,
    uid: props.uid,
    image: props.url
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
        <NuxtLink
        :to="`/${uid}`"
        >{{ uid }}</NuxtLink>
  </li>
</template>
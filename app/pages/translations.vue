<script setup lang="ts">
const { find } = useStrapi()
const config = useRuntimeConfig()

const { data: products } = useAsyncData('translations',
   async () => await find('products?locale=be')
)
onMounted(() => {
   console.log('translations', products.value)
})
</script>

<template>
   <div>
      translations
      <ul>
         <li
         v-for="prod in products.data"
         >{{ prod.name }}
      <p>{{ prod.description }}</p>
      </li>
      </ul>
   </div>
</template>

<style lang="scss" scoped>

</style>
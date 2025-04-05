<script setup>
// const { find } = useStrapi()
// const { currentLocale } = useLocale()


// const { data: products } = useAsyncData(
//    'products',
//    async () => await find('products', {
//          locale: currentLocale.value,
//          populate: '*'
//    })
// )

// onMounted(() => {
//   console.log('Prod:', products.value)
// //   console.log('First product:', products.value?.data?.[0])
// })
</script>

<template>
  <div>
    <!-- <div v-if="products">
      <div v-for="prod in products.data" :key="products.id">
        <h2>{{ prod.name }}</h2>
        <p>{{ prod.description }}</p>

      </div>
    </div> -->
  </div>
</template>

<style lang="scss" scoped>

</style>
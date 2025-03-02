<script setup lang="ts">
const { find } = useStrapi()

const { data: categories, pending, error } = useAsyncData('categories',
   async () => await find('categories', {
      populate: '*'
   })
)

onMounted(() => {
   console.log('catergories (client):', categories.value)
})
</script>

<template>
   <div>
      <Loader v-if="pending" />
      <h1>Categories</h1>
      <ul v-if="categories?.data">
         <li
         v-for="category in categories.data"
         :key="category.id"
         >{{ category.name }}
      <div 
      v-for="prod in category.products"
      :key="prod.id"
      >{{prod.name}}
   </div>
      </li>
          <li>
          </li>
      </ul>
      <div v-else-if="error">Error: {{ error.message }}</div>
   </div>
</template>

<style lang="scss" scoped>

</style>
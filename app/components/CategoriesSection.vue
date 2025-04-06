<script lang="ts" setup>
const { currentLocale } = useLocale()
</script>

<template>
   <div>
      <NuxtLink
      :to="`/${currentLocale}/categories`"
      >Categories</NuxtLink>
   </div>
</template>

<style lang="scss" scoped>
a {
   display: block;
}
</style>

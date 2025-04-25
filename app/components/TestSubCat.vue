<script lang="ts" setup>
const { currentLocale } = useLocale()
</script>

<template>
   <div>
      <NuxtLink
      :to="`/${currentLocale}/test`"
      >Test</NuxtLink>
   </div>
</template>


<style lang="scss" scoped>

</style>
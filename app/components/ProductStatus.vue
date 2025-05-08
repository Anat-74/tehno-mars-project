<script setup lang="ts">
import { stockStatusTranslations } from '~/locales/stockStatus';

const { currentLocale } = useLocale()
const { product } = defineProps<{
  product: {
    isAvailable: boolean
  }
}>()

</script>

<template>
  <span 
    :class="{
      'in-stock': product.isAvailable,
      'out-of-stock': !product.isAvailable
    }"
  >
    {{ product.isAvailable ? stockStatusTranslations[currentLocale].inStock : stockStatusTranslations[currentLocale].outOfStock }}
  </span>
</template>

<style lang="scss" scoped>
.in-stock {
   font-weight: 600;
   color: var(--forest-green-color);
}

.out-of-stock {
   color: var( --danger-color);
}
</style>
<script setup lang="ts">

</script>

<template>
   <div class="loading">
      <Icon name="eos-icons:bubble-loading" />
      <span class="loading__text">Loading...</span>
   </div>
</template>

<style lang="scss" scoped>
.loading {
   height: 140px;
   background-color: var(--dark-color);
   opacity: .5;

   svg {
      font-size: toRem(100);
      color: var(--light-color);
   }

   &__text {
      color: var(--light-color);
   }
}
</style>
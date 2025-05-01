<script lang="ts" setup>
const searchItem = ref('')
const isSearching = ref(true)
</script>

<template>
<div
class="search"
>
<div 
class="search__body" 
role="search"
>
<label 
class="visually-hidden"
for="my-search"
>Поиск товаров
</label>
   <input 
   class="search__input"
   v-model="searchItem"
   placeholder="Kitchen accessories"
   type="search"
   id="my-search"
   >
   <Icon
   v-if="isSearching"
   name="eos-icons:bubble-loading" />
   <UButton
   name-class="search"
   icon="ph:magnifying-glass-light"
   aria-label="Поиск"
   />
</div>
<div 
   v-if="false" 
   class="search__products"
   >
   <NuxtLink
   class="search__link"
   to="`/item/1`"
   >
   <NuxtImg 
   class="search__image"
   src="/image/removebg-preview.png"
   alt="image"
   format="webp"
   width="44"
   heigh="44"
   />
   <span class="search__text">Testing</span>
   <span class="search__price">
      <Icon name="my-icon:icon-by-regular" />
      98.99 
   </span>
   </NuxtLink>
</div>
</div>
</template>

<style lang="scss" scoped>
.search {
   position: relative;

   &__body {
      position: relative;
      height: toRem(40);
      display: flex;
      align-items: center;

      svg {
      position: absolute;
      top: 50%;
      right: toRem(44);
      translate: 0 -50%;
      font-size: toRem(25);
      color: var(--border-color);
      }
   }

   &__input {
      width: 100%;
      height: 100%;
      padding-inline: toRem(22);
      border-radius: toRem(4) toRem(0) toRem(0) toRem(4);
      border: toRem(2) solid var(--danger-color);
      border-right: none;
      font-size: toRem(18);
   }

   &__products {
   position: absolute;
   top: toRem(60);
   width: 100%;
   padding: toRem(4);
   border: toRem(4) solid var(--light-color);
   border-radius: toRem(4);
   border-top: none;

   @media (max-width:$mobile){
      top: toRem(56);
   }
   }

   &__link {
   display: flex;
   align-items: center;
   column-gap: toRem(2);
}

&__image {
}

&__text {
   flex: 1 1 auto;
}

&__price {
   font-weight: 500;

   svg {
      translate: toRem(2) 0;
      font-size: toRem(12);
      color: var(--gray-color);
   }
   }
}

</style>
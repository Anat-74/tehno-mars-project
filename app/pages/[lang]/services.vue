<script lang="ts" setup>
useSeoMeta({
   title: 'Наши услуги',
   ogTitle: 'Наши услуги',
   description: 'Страница о наших услугах',
   ogDescription: 'Страница о наших услугах'
})

// definePageMeta({
//    layout: 'back-to-main'
//    })
</script>

<style lang="scss" scoped>
</style>
<template>
      <section class="services">
         <h1 class="services__title"> services page</h1>
         <!-- <NuxtPicture 
         class="services__image"
         src="/image/removebg-preview.png"
         alt="image"
         loading="lazy"
         sizes="xs:100vw sm:100vw md:100vw lg:100vw"
         /> -->
      </section>
</template>

<style lang="scss" scoped>
.services {
display: flex;
&__title {
}

&__image {
}
}

</style>
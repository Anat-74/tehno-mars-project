<script setup lang="ts">
import type { FooterData, LegalInfo, SocialLink, Email, Phone } from "../types/types"
const config = useRuntimeConfig()

defineProps<{
   footer: FooterData
   legal: LegalInfo
   socials: SocialLink[]
   email: Email[]
   phones: Phone[]
}>()
</script>

<template>
   <section class="footer-component">
      <div class="footer-component__container">
         <div>{{ legal.bankName }}</div>
         <div>{{ legal.bankAddress }}</div>
         <NuxtImg
      v-if="footer.logo?.length"
      :src="`${config.public.strapi.url}${footer.logo[0]?.url}`"
      :alt="footer.companyName"
      format="webp"
      width="240"
      loading="lazy"
    />
      <div v-for="link in socials" :key="link.id">
    <a :href="link.href" target="_blank">
      <NuxtImg 
        v-if="link.icon[0]?.url"
        :src="`${config.public.strapi.url}${link.icon[0]?.url}`"
        :alt="link.label"
        width="24"
        height="24"
      />
      {{ link.label }}
    </a>
  </div>


    <div v-for="item in email" :key="item.id">
    <a 
      v-if="item.isEmail" 
      :href="`mailto:${item.email}`"
    >
      {{ item.email }}
    </a>
  </div>


  <div v-for="item in phones" :key="item.id">
    <a :href="`tel:${item.phoneNumber.replace(/[^0-9+]/g, '')}`">
      {{ item.phoneNumber }}
      <span v-if="item.isMobile">(мобильный)</span>
      <span v-if="!item.isMobile">(городской)</span>
    </a>
  </div>
         <ScrollToTop />
   </div>
   </section>
</template>

<style lang="scss" scoped>
.footer {
   background-color: var(--border-color);
}
</style>
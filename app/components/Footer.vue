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
   <section 
   aria-labelledby="base-footer"
   class="base-footer">
   <h2
      id="base-footer"
      class="visually-hidden">
      Секция с юридическими контактами компании и банковскими реквизитами
   </h2>
      <div class="base-footer__container">
       <NuxtImg
      v-if="footer.logo?.length"
      :src="`${config.public.strapi.url}${footer.logo[0]?.url}`"
      :alt="footer.companyName"
      format="webp"
      width="66"
      loading="lazy"
      class="base-footer__logo"
    />
    <div class="base-footer__company company">
      <h3 class="company__title">Компания</h3>
      <strong class="company__name">{{ footer.companyName }}</strong>
      <span class="company__woring-hours"><b>Режим работы:</b> {{ footer.workingHours }}</span>
      <p class="company__lelal-adress"><b>Адрес:</b> {{ footer.legalAdress }}</p>
      <span class="company__tax-id">{{footer.taxId}}</span>

      <div
      class="company__phones"
      v-for="item in phones" 
      :key="item.id"
      >
      <b v-if="item.isMobile">
         <Icon
         name="et:phone"
         />
 </b>
      <span v-if="!item.isMobile">
         <Icon
         name="carbon:phone-ip"
         />
      </span>
    <a
    :href="`tel:${item.phoneNumber.replace(/[^0-9+]/g, '')}`"
    class="company__link-phones"
    >
      {{ item.phoneNumber }}
    </a>
   </div>
   <div
      v-for="item in email" 
     :key="item.id"
   >
    <b v-if="item.isEmail">
      <Icon
         name="material-symbols:mail-outline"
         />
   </b> 
    <a
     v-if="item.isEmail"
      :href="`mailto:${item.email}`"
      class="company__link-email"
    >
    {{ item.email }}
    </a>
   </div>
    </div>
    <div  
   v-for="link in socials" 
   :key="link.id"
   >
   <a
    v-if="link.isSocial"
    :href="link.href" 
    target="_blank"
    >
      <NuxtImg 
        v-if="link.icon[0]?.url"
        :src="`${config.public.strapi.url}${link.icon[0]?.url}`"
        :alt="link.label"
        width="24"
        height="24"
      />
    </a>
</div>

   <div class="base-footer__legal legal">
      <h3 class="legal__title">Банковские реквизиты</h3>
   <strong class="legal__name">{{ legal.bankName }}</strong>
  <p class="legal__address">{{ legal.bankAddress }}</p>
  <span class="legal__account">{{ legal.accountNumber }}</span>
  <span class="legal__swift">{{legal.swiftCode}}</span>
</div>
   <ScrollToTop />
</div>
   </section>
</template>

<style lang="scss" scoped>
.footer {
   background-color: #778899;
}
</style>
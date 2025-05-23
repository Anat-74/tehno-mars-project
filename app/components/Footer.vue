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
      width="62"
      loading="lazy"
      class="base-footer__logo"
    />
    <div class="base-footer__socials"
    v-if="socials"
   >
   <a
   v-for="link in socials" 
   :key="link.id"
    :href="link.href" 
    target="_blank"
    >
      <NuxtImg 
         v-if="link.icon"
        :src="`${config.public.strapi.url}${link.icon[0]?.url}`"
        :alt="link.label"
        width="24"
        height="24"
      />
    </a>
   </div>
    <div class="base-footer__company company"
    >
      <h3 class="company__title">Компания</h3>
      <strong class="company__name">{{ footer.companyName }}</strong>
      <span class="company__tax-id">{{footer.taxId}}</span>
      <span class="company__woring-hours">
         <Icon
         name="mingcute:calendar-time-add-line" height="22"
         />
         {{ footer.workingHours }}</span>
      <p class="company__lelal-adress">
         <Icon name="entypo:address"
         />
         {{ footer.legalAdress }}</p>

      <div
      class="company__phones"
      v-for="item in phones" 
      :key="item.id"
      >
         <Icon
          v-if="item.isMobile"
         name="et:phone"
         />

         <Icon
          v-if="!item.isMobile"
         name="carbon:phone-ip"
         />
    <a
    :href="`tel:${item.phoneNumber.replace(/[^0-9+]/g, '')}`"
    class="company__link-phones"
    >
      {{ item.phoneNumber }}
    </a>
   </div>
   <div 
      class="company__email"
      v-for="item in email" 
     :key="item.id"
   >
      <Icon
       v-if="item.isEmail"
         name="material-symbols:mail-outline"
         />
    <a
     v-if="item.isEmail"
      :href="`mailto:${item.email}`"
      class="company__link-email"
    >
    {{ item.email }}
    </a>
   </div>
    </div>

   <NavigationFooter class="base-footer__navigation"/>
   <div class="base-footer__legal legal">
      <h3 class="legal__title">Банковские реквизиты</h3>
   <strong class="legal__name">{{ legal.bankName }}</strong>
  <p class="legal__address">
   <Icon
         name="mdi:address-marker-outline"
         />
   {{ legal.bankAddress }}</p>
  <span class="legal__account">{{ legal.accountNumber }}</span>
  <span class="legal__swift">{{legal.swiftCode}}</span>
</div>
<span class="base-footer__copyright">{{footer.copyright}}</span>
</div>
<ScrollToTop />
   </section>
</template>

<style lang="scss" scoped>
.base-footer {
   background-color:var(--bg-footer-color);
   @include adaptiveValue("padding-block", 22, 12);

&__container {
   display: grid;
   grid-template-columns: 1fr auto 1fr;
   row-gap: toEm(9);
   grid-template-areas: 
   'logo logo socials'
   'company nav legal'
   'copyr copyr ..'
   ;
   font-size: toEm(15);

   @media (max-width:$mobile){
      grid-template-columns: 1fr auto;
      grid-template-areas: 
      'logo socials'
      'company nav'
      'legal legal'
      'copyr copyr'
      ;
   }
}

&__logo {
   grid-area: logo;
   align-self: center;
   border-radius: toEm(8);
   padding: toEm(3);
   background-color: var(--light-color);

   @media (max-width:$mobile){
      max-width: toRem(48); 
   }
}

&__socials {
   grid-area: socials;
   justify-self: end;
   align-self: center;
   display: flex;
   column-gap: toRem(12);
}

&__company {
   grid-area: company;
}

&__navigation {
   grid-area: nav;
   justify-self: center;
   outline: toRem(5) inset var(--bg-nav-footer-outline);
   background-color: var(--bg-nav-footer);
   @include adaptiveValue("width", 144, 108);

   @media (max-width:$mobile){
      justify-self: end;
      outline-width: toRem(3);
   }
}

&__legal {
   grid-area: legal;
   justify-self: end;
   @media (max-width:$mobile){
      justify-self: start;
   }
}

&__copyright {
   grid-area: copyr;
   margin-inline-end: toRem(44);
   margin-block-start: toRem(16);
}
}

.company {
   display: flex;
   flex-direction: column;
   row-gap: toEm(8);
   padding-inline-end: toEm(22);

&__title {
   margin-block-end: toEm(1);
   color: var(--light-color);
}

&__name {
   font-size: toRem(15);
}

&__tax-id {
   display: block;
}


&__woring-hours {
   svg {
      translate: 0 toRem(5);
      color: var(--forest-green-color);;
   }
}

&__lelal-adress {
   svg {
      translate: 0 toRem(3);
      color: var(--dark-golden-color);
   }
}

&__phones {
   display: flex;
   align-items: center;
   column-gap: toRem(2);

   .iconify--et {
   translate: toRem(2) 0;
   margin-inline-end: toRem(7);
   color: var(--color);
   }

   svg {
      color: var(--primary-color);
   }
}

&__email {
   display: flex;
   align-items: center;
   column-gap: toRem(5);

   svg {
      color: var(--sky-blue-color);
   }
}
}

.legal {
   display: flex;
   flex-direction: column;
   row-gap: toEm(8);
   padding-inline-start: toEm(22);

   @media (max-width:$mobile){
      padding-inline-start: toRem(0);
      margin-block-start: toEm(16);
   }

&__title {
   margin-block-end: toEm(2);
   color: var(--light-color);
}

&__address {
   svg {
      translate: toRem(-5) toRem(4);
      color: var(--gray-color);
   }
}

&__account {
   align-self: end;
}

&__swift {
   align-self: end;
}
}

.iconify {
   font-size: toRem(22);
}

</style>
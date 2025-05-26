import type { LocaleCode } from "../types/types"

export const visuallyHiddenTranslations: Record<LocaleCode, {
   sectionProductSlugTitle: string
   sectionSubcategorySlugTitle: string
   sectionCategorySlugTitle: string
   sectionLangTitle: string
   sectionAboutUsTitle: string
   sectionOurServicesTitle: string
   sectionContactsTitle: string

}> = {
   ru: {
      sectionProductSlugTitle: "Секция с описанием товара",
      sectionSubcategorySlugTitle: "Секция товаров подкатегории",
      sectionCategorySlugTitle: "Секция с подкатегориями товаров",
      sectionLangTitle: "Секция с категориями товаров или главная страница",
      sectionAboutUsTitle: "Секция - О нас",
      sectionOurServicesTitle: "Секция - наши услуги",
      sectionContactsTitle: "Секция с контактами компании"
   },
   en: {
      sectionProductSlugTitle: "Product description section",
      sectionSubcategorySlugTitle: "Subcategory Products Section",
      sectionCategorySlugTitle: "Section with product subcategories",
      sectionLangTitle: "Product categories section or main page",
      sectionAboutUsTitle: "Section - About Us",
      sectionOurServicesTitle: "Section - our services",
      sectionContactsTitle: "Company contacts section"
   },
   be: {
      sectionProductSlugTitle: "Секцыя з апісаннем тавару",
      sectionSubcategorySlugTitle: "Секцыя тавараў падкатэгорыі",
      sectionCategorySlugTitle: "Секцыя з падкатэгорыямі тавараў",
      sectionLangTitle: "Секцыя з катэгорыямі тавараў або галоўная старонка",
      sectionAboutUsTitle: "Секцыя - Пра нас",
      sectionOurServicesTitle: "Секцыя - нашы паслугі",
      sectionContactsTitle: "Секцыя з кантактамі кампаніі"
   }
 }
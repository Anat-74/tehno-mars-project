import type { LocaleCode } from "../types/types"

export const baseNavigationTranslations: Record<LocaleCode, {
   home: string
   about: string
   services: string
   info: string
   contacts: string
}> = {
   ru: {
      home: "Главная",
      about: "О нас",
      services: "Услуги",
      info: "Информация",
      contacts: "Контакты"
   },
   en: {
      home: "Home",
      about: "About Us",
      services: "Services",
      info: "Information",
      contacts: "Contacts"
   },
   be: {
      home: "Галоўная",
      about: "Пра нас",
      services: "Паслугі",
      info: "Інфармацыя",
      contacts: "Кантакты"
   }
 }
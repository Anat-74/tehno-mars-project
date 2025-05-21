export interface VisibilityState {
   // isAccount: Ref<boolean>
   isContacts: Ref<boolean>
   // visibleIsAccount: () => void
   visibleIsContacts: () => void
}
//Collection========================================================================================================================================================

export type Image = {
   id: number;
   url: string;
   name: string;
   alternativeText?: string | null;
   caption?: string | null;
   ext?: string;
   formats?: {
     thumbnail?: Image;
     small?: Image;
   };
   hash?: string;
   width?: number;
   height?: number;
   mime?: string;
   size?: number;
   previewUrl?: string | null;
   provider?: string;
   createdAt?: string;
   updatedAt?: string;
   publishedAt?: string;
 }
 
 export type Category = {
   id: number;
   name: string;
   slug: string;
   description?: string;
   locale?: string;
   documentId?: string;
   createdAt?: string;
   updatedAt?: string;
    publishedAt?: string;
    image: Image[];
   subcategories?: Subcategory[];
 }
 
 export type Subcategory = {
   id: number;
   name: string;
   slug: string;
    description?: string;
   price: string
   locale?: string;
   documentId?: string;
   createdAt?: string;
   updatedAt?: string;
   publishedAt?: string;
   image: Image[];
   products?: Product[];
 }
 
 export type Product = {
   id: number;
   name: string;
   slug: string;
   price: number;
   description: string;
   characteristics: string;
   isAvailable: boolean;
   image: Image[];
   category: {
     slug: string;
   };
   subcategory?: {
     slug: string;
     category?: {
       slug: string;
     }
   };
   locale?: string;
   documentId?: string;
   createdAt?: string;
   updatedAt?: string;
   publishedAt?: string;
 }
 
 export type PaginationMeta = {
   page: number;
   pageSize: number;
   pageCount: number;
   total: number;
 }
 
 export type ProductsResponse = {
   data: Product[];
   meta: {
     pagination: PaginationMeta;
   }
 }
 
 export type SubcategoriesResponse = {
   data: Subcategory[];
   meta: {
     pagination: PaginationMeta;
   }
 }

//============================================================================================================================================

export type LocaleCode = 'ru' | 'en' | 'be'

//Single Type==================================================================================================================================================

// Тип для иконок (используется в SocialLink и Footer)
// export interface StrapiImage {
//    id: number
//    url: string
//    alternativeText?: string | null
//    documentId?: string
//  }
 
//  // Социальные сети
//  export interface SocialLink {
//    id: number
//    label: string
//    href: string
//    isSocial: boolean | null
//    icon: StrapiImage[]
//  }
 
//  // Элементы списка email
//  export interface Email {
//    id: number
//    email: string
//    isEmail: boolean | null
//  }
 
//  // Элементы списка телефонов
//  export interface Phone {
//    id: number
//    phoneNumber: string
//    isMobile: boolean
//  }
 
//  // Блок footer в Global
//  export interface FooterData {
//    id: number
//    companyName: string
//    copyright: string
//    legalAdress: string
//    taxId: string
//    workingHours: string
//    logo: StrapiImage[]
//  }
 
//  // Юридическая информация
//  export interface LegalInfo {
//    id: number
//    accountNumber: string
//    bankAddress: string
//    bankName: string
//    swiftCode: string
//  }
 
//  // Основной тип для Global
// // Для Single Types (Global)
// export interface GlobalData {
//    id: number;
//    documentId: string;
//    createdAt: string;
//    updatedAt: string;
//    publishedAt: string;
//    locale: string;
//    email: Email[];
//    phones: Phone[];
//    socials: SocialLink[];
//    footer: FooterData;
//    legal: LegalInfo;
//  }
 
//  // Для запросов к Single Type
//  export interface StrapiSingleResponse<T> {
//    data: T; // Без вложенности!
//  }


// Изображения
export interface StrapiImage {
   id: number;
   url: string;
   alternativeText: string | null;
   documentId?: string; // Опционально, т.к. есть не у всех изображений
 }
 
 // Социальные сети
 export interface SocialLink {
   id: number;
   label: string;
   href: string;
   isSocial: boolean | null;
   icon: StrapiImage[];
 }
 
 // Email-адреса
 export interface Email {
   id: number;
   email: string;
   isEmail: boolean | null;
 }
 
 // Телефоны
 export interface Phone {
   id: number;
   phoneNumber: string;
   isMobile: boolean;
 }
 
 // Футер
 export interface FooterData {
   id: number;
   companyName: string;
   copyright: string;
   legalAdress: string;
   taxId: string;
   workingHours: string;
   logo: StrapiImage[];
 }
 
 // Юридическая информация
 export interface LegalInfo {
   id: number;
   accountNumber: string;
   bankAddress: string;
   bankName: string;
   swiftCode: string;
 }
 
 // Основной тип для Global
 export interface GlobalData {
   id: number;
   documentId: string;
   createdAt: string;
   updatedAt: string;
   publishedAt: string;
   locale: string;
   email: Email[];
   phones: Phone[];
   socials: SocialLink[];
   footer: FooterData;
   legal: LegalInfo;
 }
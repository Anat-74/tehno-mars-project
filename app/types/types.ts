export interface TranslationData {
   [key: string]: string
 }
 
 export interface TranslationsCache {
   [lang: string]: TranslationData
 }
//========================================================================================================================================
export interface PropsProduct {
   id: number
   title: string
   description: string
   url: string
   price: number
}
//===============================================================================================================================================
export interface VisibilityState {
   isAccount: Ref<boolean>
   isContacts: Ref<boolean>
   visibleIsAccount: () => void
   visibleIsContacts: () => void
}
//========================================================================================================================================================
export type Image = {
   id: number;
   documentId: string;
   name: string;
   alternativeText: string | null;
   caption: string | null;
   url: string;
 }
 
 export type Category = {
   id: number;
   documentId: string;
    name: string;
    slug: string;
   createdAt: string;
   updatedAt: string;
   publishedAt: string;
 }
 
 export type Product = {
   id: number;
   documentId: string;
   name: string;
   description: string;
   slug: string;
   price: number;
   createdAt: string;
   updatedAt: string;
   publishedAt: string;
   image: Image[];
   category: Category;
 }
 
 export type ProductsResponse = {
   data: Product[];
   meta: {
     pagination: {
       page: number;
       pageSize: number;
       pageCount: number;
       total: number;
     }
   }
}
 //============================================================================================================================================
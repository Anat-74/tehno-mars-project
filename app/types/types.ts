export interface VisibilityState {
   // isAccount: Ref<boolean>
   isContacts: Ref<boolean>
   // visibleIsAccount: () => void
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
   locale: string;
   createdAt: string;
   updatedAt: string;
   publishedAt: string;
 }
 
 export type Product = {
   id: number;
   documentId: string;
    name: string;
    characteristics: string;
   description: string;
   slug: string;
   locale: string;
    price: number;
    isAvailable: boolean;
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

export type LocaleCode = 'ru' | 'en' | 'be'

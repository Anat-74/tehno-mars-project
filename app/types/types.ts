export interface VisibilityState {
   // isAccount: Ref<boolean>
   isContacts: Ref<boolean>
   // visibleIsAccount: () => void
   visibleIsContacts: () => void
}
//========================================================================================================================================================

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

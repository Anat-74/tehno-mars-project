export interface PropsProduct {
   id: number
   title: string
   description: string
   url: string
   price: number
}

export interface VisibilityState {
   isAccount: Ref<boolean>
   isContacts: Ref<boolean>
   visibleIsAccount: () => void
   visibleIsContacts: () => void
}

export interface Product {
   id: number
   documentId: string
   Name: string
   Price: string
   createdAt: string
   updatedAt: string
   publishedAt: string
   Description: string
   Image: {
     id: number
     documentId: string
     name: string
     alternativeText: string | null
     caption: string | null
     width: number
     height: number
     formats: {
       thumbnail: {
         name: string
         hash: string
         ext: string
         mime: string
         path: string | null
         width: number
         height: number
         size: number
         sizeInBytes: number
         url: string
       }
       small?: {
         name: string
         hash: string
         ext: string
         mime: string
         path: string | null
         width: number
         height: number
         size: number
         sizeInBytes: number
         url: string
       }
     }
     hash: string
     ext: string
     mime: string
     size: number
     url: string
     previewUrl: string | null
     provider: string
     provider_metadata: null
     createdAt: string
     updatedAt: string
     publishedAt: string
   }[]
   category: {
     id: number
     documentId: string
     Name: string
     Description: Array<{ type: string; children: Array<{ type: string; text: string }> }>
     createdAt: string
     updatedAt: string
     publishedAt: string
   } | null
 }
 
 export interface ProductsResponse {
   data: Product[]
   meta: {
     pagination: {
       page: number
       pageSize: number
       pageCount: number
       total: number
     }
   }
 }
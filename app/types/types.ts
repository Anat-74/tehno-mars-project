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
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
   const persist = ref<boolean>(true)
   const isMenuOverlay = ref<boolean>(false)
   const isLoading = ref<boolean>(false)
   const cart = ref<any[]>([])
   const checkout = ref<any[]>([])

   return {
      persist,
      isMenuOverlay,
      isLoading,
      cart,
      checkout
   }
})
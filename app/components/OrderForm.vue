<script setup lang="ts">
import { orderFormTranslations } from '~/locales/orderForm'
const { currentLocale } = useLocale()

const form = reactive({
   email: '',
   phone: '',
   agree: false
})

const cartStore = useCartStore()
const orderStore = useOrderStore()
const isSubmitting = ref(false)

const submitOrder = async () => {
   if (!form.agree || !form.email || !form.phone) return

   isSubmitting.value = true
   try {
      await orderStore.createOrder(form.email, form.phone)
      alert("Заказ успешно ооформлен!")
   } catch (error) {
      alert('Ошибка:' + error)
   } finally {
      isSubmitting.value = false
   }
}
</script>

<template>
   <div class="order-form">
     <h3>{{ orderFormTranslations[currentLocale].title }}</h3>
     <form @submit.prevent="submitOrder">
       <div>
         <label>{{ orderFormTranslations[currentLocale].email }}</label>
         <input 
           v-model="form.email" 
           type="email" 
           required
           placeholder="your@email.com"
         >
       </div>
       <div>
         <label>{{ orderFormTranslations[currentLocale].phone }}</label>
         <input
           v-model="form.phone"
           type="tel"
           required
           placeholder="+375(00) 000-00-00"
         >
       </div>
       <div>
         <label>
           <input 
             v-model="form.agree" 
             type="checkbox" 
             required
           >
           {{ orderFormTranslations[currentLocale].checkbox }}
         </label>
         <span>{{ orderFormTranslations[currentLocale].total }}</span>
         <span>
            <Icon 
               class="icon-bel-ruble"
               name="my-icon:icon-by-regular" 
             />
            {{ cartStore.totalPrice }}
         </span>
       </div>
       <UButton
             size="large"
             type="submit" 
             :disabled="isSubmitting || cartStore.totalItems === 0"
             :label="isSubmitting ? orderFormTranslations[currentLocale].submitting : orderFormTranslations[currentLocale].checkout"
           />
     </form>
   </div>
 </template>

<style lang="scss" scoped>

</style>
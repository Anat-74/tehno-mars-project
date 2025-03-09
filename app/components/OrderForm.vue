<script setup lang="ts">
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
     <h3>Оформление заказа</h3>
     <form @submit.prevent="submitOrder">
       <div>
         <label>Email:</label>
         <input 
           v-model="form.email" 
           type="email" 
           required
           placeholder="your@email.com"
         >
       </div>
       <div>
         <label>Телефон:</label>
         <input
           v-model="form.phone"
           type="tel"
           required
           placeholder="+7 (999) 123-45-67"
         >
       </div>
       <div>
         <label>
           <input 
             v-model="form.agree" 
             type="checkbox" 
             required
           >
           Согласен с условиями обработки данных
         </label>
       </div>
       <button 
         type="submit" 
         :disabled="isSubmitting || cartStore.totalItems === 0"
       >
         {{ isSubmitting ? 'Оформляем...' : 'Подтвердить заказ' }}
       </button>
     </form>
   </div>
 </template>

<style lang="scss" scoped>

</style>
<script setup lang="ts">
useSeoMeta({
   title: 'Аутентификация',
   ogTitle: 'Аутентификация',
   description: 'Страница аутентификации',
   ogDescription: 'Страница аутентификации'
})


// const router = useRouter()
// const { login, logout } = useStrapiAuth()
// const user = useStrapiUser()

// const form = reactive({
//   identifier: '',
//   password: ''
// })

// const handleLogin = async () => {
//   try {
//     await login({
//       identifier: form.identifier,
//       password: form.password
//     })
//     router.push('/profile')
//   } catch (error) {
//     console.error('Ошибка входа:', error)
//     alert('Неверные учетные данные')
//   }
// }

// const handleLogout = () => {
//   logout()
//   router.push('/')
// }
</script>

<template>
   <div>
      Аутентификация
   </div>
   <!-- <div class="auth-widget">
    <div v-if="user">
      <p>Добро пожаловать, {{ user.username }}!</p>
      <button @click="handleLogout">Выйти</button>
    </div>
    
    <form v-else @submit.prevent="handleLogin">
      <input 
        v-model="form.identifier"
        type="email" 
        placeholder="Email"
        required
      >
      <input
        v-model="form.password"
        type="password"
        placeholder="Пароль"
        required
      >
      <button type="submit">Войти</button>
    </form>
  </div> -->
</template>

<style lang="scss" scoped>

</style>
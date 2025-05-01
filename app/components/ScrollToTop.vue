<script setup lang="ts">
const isVisible = ref(false)

const checkScroll = () => {
  isVisible.value = window.scrollY > 1800
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', checkScroll);
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', checkScroll);
  }
})
</script>

<template>
      <UButton
      @click="scrollToTop"
      v-show="isVisible"
      name-class="go-to-top"
      icon="pixelarticons:chevron-up"
      aria-label="scroll to top"
      />
</template>
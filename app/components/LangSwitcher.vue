<script setup>
const { currentLocale, locales, switchLocale } = useLocale()
</script>

<template>
  <div class="lang-switcher">
    <button
      v-for="locale in locales"
      :key="locale.code"
      :class="{ active: currentLocale === locale.code }"
      @click="switchLocale(locale.code)"
      type="button"
    >
      {{ locale.name }}
    </button>
  </div>
</template>

<style scoped>
.lang-switcher {
  display: flex;
  gap: 8px;
}
.active {
  font-weight: bold;
  border-bottom: 2px solid;
}
</style>
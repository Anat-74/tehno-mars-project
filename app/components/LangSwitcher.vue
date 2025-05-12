<script setup>
const { currentLocale, locales, switchLocale } = useLocale()
</script>

<template>
  <div class="lang-switcher">
    <UButton
      v-for="locale in locales"
      :key="locale.code"
      :icon="locale.icon"
      :class="{ active: currentLocale === locale.code }"
      @click="switchLocale(locale.code)"
      aria-label="Переключить язык"
    />
  </div>
</template>

<style lang="scss" scoped>
.lang-switcher {
  display: inline-flex;
  gap: toEm(18);
  padding-inline-end: toEm(12);
  padding-block: toEm(12);
}
.active {
   opacity: .6;
}
</style>
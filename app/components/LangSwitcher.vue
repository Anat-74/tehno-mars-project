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
  flex-direction: column;
  gap: toRem(12);
  padding-inline: toEm(12);
  padding-block: toEm(8);
  border-radius: toEm(8);
  margin-inline-start: toEm(36);
  margin-block-start: toEm(8);
  background-color: var(--light-color);
}
.active {
   border: 1px solid var(--danger-color);
   border-radius: 50%;
   padding: toRem(1);
   font-size: toRem(20);
}
</style>
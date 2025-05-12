<script setup>
const { currentLocale, locales, switchLocale } = useLocale()
</script>

<template>
  <div class="lang-switcher">
    <UButton
      v-for="locale in locales"
      :key="locale.code"
      :label="locale.name"
      :class="{ active: currentLocale === locale.code }"
      @click="switchLocale(locale.code)"
    >
    <Icon
    name="emojione:flag-for-belarus"
    />
      {{ locale.name }}
    </UButton>
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
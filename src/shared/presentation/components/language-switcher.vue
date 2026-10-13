<script setup>
/**
 * Language switcher.
 * @summary Select buttons to switch between English and Spanish.
 * @author Carolina Navarro Aldoradin
 */
import { useI18n } from "vue-i18n";

const { locale, availableLocales } = useI18n();
</script>

<template>
  <pv-select-button v-model="locale" :options="availableLocales" :allow-empty="false" aria-label="Language">
    <template #option="slotProps">
      <span>{{ slotProps.option.toUpperCase() }}</span>
    </template>
  </pv-select-button>
</template>

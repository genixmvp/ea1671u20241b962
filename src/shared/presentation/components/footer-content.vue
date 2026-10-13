<script setup>
/**
 * Footer content.
 * @summary Copyright, author and PokeAPI attribution.
 * @author Carolina Navarro Aldoradin
 */
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <footer class="w-full bg-primary p-3 mt-5" role="contentinfo">
    <div class="flex flex-column align-items-center gap-1 text-center text-sm">
      <span>{{ t('footer.copyright') }}</span>
      <span>{{ t('footer.developed-by') }} u20241b962 - Carolina Navarro Aldoradin</span>
      <span>
        {{ t('footer.attribution') }}
        <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer" class="text-white font-bold">PokeAPI</a>
      </span>
    </div>
  </footer>
</template>

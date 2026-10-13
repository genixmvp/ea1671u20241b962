<script setup>
/**
 - Home view.
 - @summary Displays the home welcome texts and the game storage sections collection grid.
 - @author Tu Nombre y Apellido
 */
import { useI18n } from "vue-i18n";
import GameStorageSectionSummaryList from "../components/game-storage-section-summary-list.vue";

const { t } = useI18n();
</script>

<template>
  <section class="flex flex-column gap-4" aria-labelledby="home-title">
    <div>
      <h1 id="home-title" class="m-0 text-3xl font-bold">{{ t('home.title') }}</h1>
      <p class="mt-2 mb-0 text-color-secondary text-lg">{{ t('home.subtitle') }}</p>
    </div>

    <div class="flex flex-column gap-3">
      <h2 class="m-0 text-xl font-semibold">{{ t('home.collections-title') }}</h2>
      <game-storage-section-summary-list/>
    </div>
  </section>
</template>
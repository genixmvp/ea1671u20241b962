<script setup>
/**
 * Home view.
 * @summary Welcome text and the "My Storage Boxes" section.
 * @author Carolina Navarro Aldoradin
 */
import { useI18n } from "vue-i18n";
import StorageBoxSummaryList from "@/inventory/presentation/components/inventory-box-summary-list.vue";

const { t } = useI18n();
</script>

<template>
  <section class="flex flex-column gap-3" aria-labelledby="home-title">
    <h1 id="home-title" class="m-0">{{ t('home.title') }}</h1>
    <p class="m-0">{{ t('home.content') }}</p>
    <h2 class="mb-0">{{ t('home.my-game-collections') }}</h2>
    <storage-box-summary-list/>
  </section>
</template>

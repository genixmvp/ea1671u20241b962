<script setup>
/**
 * Page not found view.
 * @summary Shows the unavailable path and a button to return Home.
 * @author Carolina Navarro Aldoradin
 */
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const unavailablePath = route.path;
</script>

<template>
  <section class="flex flex-column gap-3" aria-labelledby="not-found-title">
    <h1 id="not-found-title" class="m-0">{{ t('page-not-found.title') }}</h1>
    <p class="m-0">{{ t('page-not-found.content', { path: unavailablePath }) }}</p>
    <div>
      <pv-button :label="t('page-not-found.go-home')" icon="pi pi-home" @click="router.push({ name: 'home' })"/>
    </div>
  </section>
</template>

<script setup>
/**
 * Game storage section summary list.
 * @summary Responsive grid with two game storage section summaries per row.
 * @author Carolina Navarro
 */
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import useInventoryStore from "@/inventory/application/inventory.store.js";
import GameStorageSectionSummary from "./game-storage-section-summary.vue";

const store = useInventoryStore();
const { gameStorageSections } = storeToRefs(store);

onMounted(() => {
  store.fetchGameStorageSections();
  store.fetchGameInventoryItems();
});
</script>

<template>
  <div class="grid" role="list">
    <div v-for="section in gameStorageSections" :key="section.id" class="col-12 md:col-6" role="listitem">
      <game-storage-section-summary :game-storage-section="section" :items="store.getItemsBySectionId(section.id)"/>
    </div>
  </div>
</template>
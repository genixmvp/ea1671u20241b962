<script setup>
/**
 - Game storage section summary.
 - @summary Card with the section name, its game genre, and capacity indicators.
 - @author Carolina Navarro
 */
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
  /** @type {import('@/inventory/domain/model/game-storage-section.entity.js').GameStorageSection} */
  gameStorageSection: { type: Object, required: true },
  /** @type {import('@/inventory/domain/model/game-inventory-item.entity.js').GameInventoryItem[]} */
  items: { type: Array, default: () => [] }
});

const { t, locale } = useI18n();

const totalGames = computed(() => props.gameStorageSection.totalGames(props.items));
const usedCapacity = computed(() => props.gameStorageSection.usedCapacity(props.items));
const availableCapacity = computed(() => props.gameStorageSection.availableCapacity(props.items));

/**
 - Formats an integer according to the current locale.
 - @param {number} value
 - @returns {string}
 */
const formatNumber = (value) => new Intl.NumberFormat(locale.value).format(value);
</script>

<template>
  <pv-card class="h-full" role="article" :aria-label="gameStorageSection.name">
    <template #title>{{ gameStorageSection.name }}</template>
    <template #subtitle>
      <pv-tag :value="gameStorageSection.gameGenre" severity="secondary"/>
    </template>
    <template #content>
      <p v-if="items.length === 0" class="m-0 font-italic">{{ t('game-storage-section.no-games') }}</p>
      <ul v-else class="list-none p-0 m-0" :aria-label="gameStorageSection.name">
        <li v-for="item in items" :key="item.id" class="flex justify-content-between py-1">
          <span class="capitalize">{{ item.gameName }}</span>
          <span>{{ t('game-storage-section.quantity') }}: {{ formatNumber(item.quantity) }}</span>
        </li>
      </ul>
    </template>
    <template #footer>
      <pv-divider/>
      <div class="flex flex-wrap justify-content-between gap-2 text-sm">
        <span>{{ t('game-storage-section.total-games') }}: <strong>{{ formatNumber(totalGames) }}</strong></span>
        <span>{{ t('game-storage-section.used-capacity') }}: <strong>{{ formatNumber(usedCapacity) }}</strong></span>
        <span>{{ t('game-storage-section.available-capacity') }}: <strong>{{ formatNumber(availableCapacity) }}</strong></span>
      </div>
    </template>
  </pv-card>
</template>
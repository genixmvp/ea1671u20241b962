<script setup>
/**
 - Game inventory item form view.
 - @summary Registers a game inventory item after validating rating and capacity.
 - @author Tu Nombre y Apellido
 */
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useToast } from "primevue";
import { storeToRefs } from "pinia";
import useInventoryStore from "@/inventory/application/inventory.store.js";
import useCatalogStore from "@/catalog/application/catalog.store.js";
import { GameInventoryItem } from "@/inventory/domain/model/game-inventory-item.entity.js";

const { t } = useI18n();
const router = useRouter();
const toast = useToast();
const inventoryStore = useInventoryStore();
const catalogStore = useCatalogStore();
const { gameStorageSections } = storeToRefs(inventoryStore);
const { selectedGame, loading, requestFailed } = storeToRefs(catalogStore);

const selectedSectionId = ref(null);
const selectedGameName = ref(null);
const quantity = ref(null);
/** Validation messages as { key, params } so they follow the current language. */
const validationMessages = ref([]);

onMounted(() => {
  catalogStore.reset();
  if (!inventoryStore.gameStorageSectionsLoaded) inventoryStore.fetchGameStorageSections();
  if (!inventoryStore.gameInventoryItemsLoaded) inventoryStore.fetchGameInventoryItems();
});

const selectedSection = computed(() => inventoryStore.getGameStorageSectionById(selectedSectionId.value) ?? null);
const selectedSectionItems = computed(() => selectedSection.value ? inventoryStore.getItemsBySectionId(selectedSection.value.id) : []);
const availableCapacity = computed(() => selectedSection.value ? selectedSection.value.availableCapacity(selectedSectionItems.value) : null);
const gameOptions = computed(() => (catalogStore.gamesList ?? []).map(game => ({ name: game.name })));

watch(selectedSectionId, () => {
  selectedGameName.value = null;
  validationMessages.value = [];
  if (selectedSection.value) catalogStore.fetchGamesByGenre(selectedSection.value.gameGenreId);
});

watch(selectedGameName, (name) => {
  validationMessages.value = [];
  if (name) catalogStore.fetchGameByName(name);
});

/**
 - Applies the business rules in order.
 - @returns {{key: string, params?: Object}[]} Messages of the rules that are not met.
 */
const validate = () => {
  const messages = [];
  if (!selectedSection.value) messages.push({ key: 'validation.storage-section-required' });
  if (!selectedGameName.value) messages.push({ key: 'validation.game-required' });
  if (!Number.isInteger(quantity.value) || quantity.value <= 0) messages.push({ key: 'validation.quantity-invalid' });
  if (messages.length) return messages;

  if (requestFailed.value || !selectedGame.value) return [{ key: 'validation.catalog-error' }];

  const rating = selectedGame.value.rating;
  if (typeof rating !== 'number' || !Number.isFinite(rating)) {
    messages.push({ key: 'validation.rating-invalid' });
  } else if (!selectedSection.value.meetsMinRating(rating)) {
    messages.push({ key: 'validation.rating-too-low',
      params: { value: rating, min: selectedSection.value.minRating } });
  }
  if (!selectedSection.value.hasCapacityFor(quantity.value, selectedSectionItems.value)) {
    messages.push({ key: 'validation.capacity-exceeded',
      params: { required: quantity.value * selectedSection.value.storageUnits, available: availableCapacity.value } });
  }
  return messages;
};

/** Validates and, only if valid, sends the POST request. */
const createGameInventoryItem = () => {
  validationMessages.value = validate();
  if (validationMessages.value.length) return;

  const inventoryItem = new GameInventoryItem({
    sectionId: selectedSection.value.id,
    gameGenreId: selectedSection.value.gameGenreId,
    gameId: selectedGame.value.id,
    gameName: selectedGame.value.name,
    quantity: quantity.value,
    registeredAt: new Date()
  });
  inventoryStore.addGameInventoryItem(inventoryItem).then(() => {
    toast.add({ severity: 'success', summary: t('game-item.created'), life: 3000 });
    router.push({ name: 'home' });
  }).catch(() => {
    validationMessages.value = [{ key: 'validation.create-error' }];
  });
};

/** Discards the form and returns Home. */
const cancel = () => router.push({ name: 'home' });
</script>

<template>
  <section class="flex flex-column gap-3" aria-labelledby="game-item-title">
    <div>
      <h1 id="game-item-title" class="m-0">{{ t('game-item.title') }}</h1>
      <p class="mt-1 mb-0">{{ t('game-item.subtitle') }}</p>
    </div>

    <pv-card>
      <template #content>
        <form class="formgrid grid" @submit.prevent="createGameInventoryItem" aria-describedby="form-messages">
          <div class="field col-12 md:col-6">
            <label for="game-storage-section">{{ t('game-item.storage-section') }}</label>
            <pv-select id="game-storage-section" v-model="selectedSectionId" :options="gameStorageSections" option-label="name"
                       option-value="id" :placeholder="t('game-item.select-storage-section')" class="w-full"
                       :aria-label="t('game-item.storage-section')"/>
          </div>
          <div class="field col-12 md:col-6">
            <label for="game">{{ t('game-item.game') }}</label>
            <pv-select id="game" v-model="selectedGameName" :options="gameOptions" option-label="name"
                       option-value="name" filter :loading="loading" :disabled="!selectedSection"
                       :placeholder="t('game-item.select-game')" class="w-full"
                       :aria-label="t('game-item.game')"/>
          </div>
          <div class="field col-12 md:col-6">
            <label for="quantity">{{ t('game-item.quantity') }}</label>
            <pv-input-number id="quantity" v-model="quantity" :min="1" :use-grouping="false" class="w-full"
                             :aria-label="t('game-item.quantity')"/>
          </div>

          <div class="col-12">
            <div class="flex flex-wrap gap-2" aria-live="polite">
              <pv-tag severity="info"
                      :value="`${t('game-item.rating')}: ${selectedGame?.rating ?? t('game-item.not-available')}`"/>
              <pv-tag severity="secondary"
                      :value="`${t('game-item.min-rating')}: ${selectedSection?.minRating ?? t('game-item.not-available')}`"/>
              <pv-tag severity="secondary"
                      :value="`${t('game-item.storage-units')}: ${selectedSection?.storageUnits ?? t('game-item.not-available')}`"/>
              <pv-tag severity="secondary"
                      :value="`${t('game-item.available-capacity')}: ${availableCapacity ?? t('game-item.not-available')}`"/>
            </div>
          </div>

          <div id="form-messages" class="col-12 flex flex-column gap-2" aria-live="assertive">
            <pv-message v-for="message in validationMessages" :key="message.key" severity="error">
              {{ t(message.key, message.params ?? {}) }}
            </pv-message>
            <pv-message v-if="requestFailed && !validationMessages.length" severity="warn">
              {{ t('validation.catalog-error') }}
            </pv-message>
          </div>

          <div class="col-12 flex gap-2">
            <pv-button type="submit" :label="t('game-item.create')" icon="pi pi-check"/>
            <pv-button type="button" :label="t('game-item.cancel')" icon="pi pi-times" severity="secondary" @click="cancel"/>
          </div>
        </form>
      </template>
    </pv-card>
  </section>
</template>
<script setup>
/**
 * Layout.
 * @summary Toolbar with logo and title, collapsible sidebar with options and language switcher, and footer.
 * @author Carolina Navarro Aldoradin
 */
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import LanguageSwitcher from "./language-switcher.vue";
import FooterContent from "./footer-content.vue";

const { t } = useI18n();

const logoUrl = `${import.meta.env.VITE_LOGO_DEV_API_URL}/rawg.io?token=${import.meta.env.VITE_LOGO_DEV_PUBLISHABLE_KEY}`;

/** Sidebar visibility. */
const drawer = ref(false);

/** Toggles the sidebar. */
const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

const items = [
  { label: 'option.home', to: '/home', icon: 'pi pi-home' },
  { label: 'option.new-box-item', to: '/inventory/items/new', icon: 'pi pi-plus' }
];
</script>

<template>
  <pv-toast/>
  <header>
    <pv-toolbar class="bg-primary border-noround">
      <template #start>
        <pv-button icon="pi pi-bars" text class="text-white" :aria-label="t('app.toggle-menu')" @click="toggleDrawer"/>
        <img :src="logoUrl" :alt="t('app.logo-alt')" class="w-2rem h-2rem border-round ml-2"/>
        <h1 class="text-xl ml-3 my-0">{{ t('app.title') }}</h1>
      </template>
    </pv-toolbar>
  </header>

  <pv-drawer v-model:visible="drawer" :header="t('app.title')">
    <div class="flex flex-column h-full justify-content-between">
      <nav class="flex flex-column gap-2" aria-label="Main navigation">
        <pv-button v-for="item in items" :key="item.label" as-child v-slot="slotProps">
          <router-link :to="item.to" :class="slotProps['class']" @click="drawer = false">
            <i :class="item.icon" aria-hidden="true"/> {{ t(item.label) }}
          </router-link>
        </pv-button>
      </nav>
      <div class="flex justify-content-center pb-3">
        <language-switcher/>
      </div>
    </div>
  </pv-drawer>

  <main class="p-3 md:p-5">
    <router-view/>
  </main>
  <footer-content/>
</template>

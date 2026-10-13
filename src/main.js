import { createApp } from 'vue';
import './style.css';
import App from './app.vue';
import i18n from "@/i18n.js";
import pinia from "@/pinia.js";
import router from "@/router.js";
import PrimeVue from "primevue/config";
import Material from "@primeuix/themes/material";
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import {
    Button, Card, Divider, Drawer, InputNumber, Message, Select,
    SelectButton, Tag, Toast, ToastService, Toolbar
} from "primevue";

const primeUiLicenseKey = import.meta.env.VITE_PRIME_UI_LICENSE_KEY;

createApp(App)
    .use(i18n)
    .use(PrimeVue, { ripple: true, theme: { preset: Material }, license: primeUiLicenseKey })
    .use(ToastService)
    .component('pv-button', Button)
    .component('pv-card', Card)
    .component('pv-divider', Divider)
    .component('pv-drawer', Drawer)
    .component('pv-input-number', InputNumber)
    .component('pv-message', Message)
    .component('pv-select', Select)
    .component('pv-select-button', SelectButton)
    .component('pv-tag', Tag)
    .component('pv-toast', Toast)
    .component('pv-toolbar', Toolbar)
    .use(pinia)
    .use(router)
    .mount('#app');

import '@/assets/styles.css';
import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import '@khmyznikov/pwa-install';

import { registerSW } from 'virtual:pwa-register';

registerSW({ immediate: true });

const app = createApp(App);
// app.config.compilerOptions.isCustomElement = (tag: string) => ['pwa-install'].includes(tag);
app.use(router);
app.mount('#app');

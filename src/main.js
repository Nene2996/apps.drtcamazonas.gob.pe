import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import SearchTransport from './components/transport/SearchTransport.vue';
import BaseButton from './components/UI/BaseButton.vue';
import ValidationQrCode from './components/transport/ValidationQrCode.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/transporte-terrestre-interprovincial', name: 'drtc', component: SearchTransport },
        { path: '/transporte-terrestre-interprovincial/validacion-codigo-qr', component: ValidationQrCode, name: 'validateQr' }
    ]
});

const app = createApp(App);

app.use(router);
app.component('base-button', BaseButton);

app.mount('#app');



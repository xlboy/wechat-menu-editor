import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';

import './assets/styles/reset.css';
import './assets/styles/common.css';
import './assets/fonts/iconfont/iconfont.css';

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

const app = createApp(App);
app.use(router).use(Antd).mount('#app')



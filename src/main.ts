import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; // 引入样式
import App from './App.vue';
import router from './router';
// 配置 nprogress
NProgress.configure({
  showSpinner: false, // 关闭加载时的旋转动画
  speed: 500, // 进度条的速度
  minimum: 0.1, // 最小百分比
});
const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');

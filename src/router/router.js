import Vue from 'vue';
import Router from 'uni-simple-router';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'start',
            component: () => import('@/pages/start/start.vue'),
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/pages/login/login.vue'),
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('@/pages/register/register.vue'),
        },
        {
            path: '/lostPassword',
            name: 'lostPassword',
            component: () => import('@/pages/lostPassword/lostPassword.vue'),
        },
        {
            path: '/verifyLogin',
            name: 'verifyLogin',
            component: () => import('@/pages/verifyLogin/verifyLogin.vue'),
        },
        {
            path: '/home',
            name: 'home',
            component: () => import('@/pages/home/index.vue'),
            tabBar: true, // 显示底部导航栏
        },
    ],
});

export default router;

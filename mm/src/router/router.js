import Vue from 'vue'
import Router from 'vue-router'
import routes from '@/router/routerConfig.js';
Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    // 判断是否需要守卫
    if (to.matched.some(item => item.meta.requiresAuth)) {

        //判断是否已经登陆
        if (window.localStorage.token) {
            //已经登录直接跳过
            next();
        } else {
            //没有登陆跳转至登录页面
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                }
            })
        }
    } else {
        //不需要守卫直接跳过
        next()
    }

})

router.afterEach((to, from) => {
    if (to.meta && to.meta.title) {
        document.title = to.meta.title;
    } else {
        document.title = "刘新书的项目";
    }
})
export default router;
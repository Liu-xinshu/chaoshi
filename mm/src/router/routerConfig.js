const routes = [{
        path: '/index',
        name: 'index',
        children: [{
                path: 'home',
                name: 'home',
                meta: {
                    title: "首页",
                    requiresAuth: false
                },
                children: [],
                component: () =>
                    import ('@/views/index/home/home.vue')

            },
            {
                path: 'classify',
                name: 'classify',
                meta: {
                    title: "分类",
                    requiresAuth: false
                },
                children: [],
                component: () =>
                    import ('@/views/index/classify/classify.vue')

            },
            {
                path: 'my',
                name: 'my',
                meta: {
                    title: "我的",
                    requiresAuth: true
                },
                children: [],
                component: () =>
                    import ('@/views/index/my/my.vue')

            }
        ],
        component: () =>
            import ('@/views/index/index.vue')

    },
    {
        path: '/login',
        name: 'login',
        meta: {
            title: "登陆",
            requiresAuth: false
        },
        children: [],
        component: () =>
            import ('@/views/login.vue')

    },
    {
        path: '/detail',
        name: 'detail',
        children: [],
        component: () =>
            import ('@/views/detail.vue')

    },
    {
        path: '/shopping',
        name: 'shopping',
        meta: {
            title: "购物车",
            requiresAuth: true
        },
        children: [],
        component: () =>
            import ('@/views/shopping.vue')

    },
    {
        path: '/',
        redirect: "/index/home"
    },
    {
        path: "*",
        component: () =>
            import ('@/views/notfound.vue')
    }

]





export default routes;
import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '../layout/DefaultLayout.vue'
import SimpleLayout from '../layout/SimpleLayout.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/MainView.vue'),
      meta: { layout: SimpleLayout },
    },
    {
      path: '/recorder',
      name: 'recorder',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/RecorderView.vue'),
      meta: { layout: DefaultLayout },
    },
    {
      path: '/history',
      name: 'history',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/HistoryView.vue'),
      children: [
        {
          path: 'list',
          name: 'history-list',
          component: () => import('../components/HistoryList.vue'),
        },
        {
          path: 'detail',
          name: 'history-detail',
          component: () => import('../components/HistoryDetail.vue'),
        },
      ],
    },
    {
      path: '/myPage',
      name: 'my-page',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/MypageView.vue'),
      meta: { layout: DefaultLayout },
    },

    {
      path: '/Api/Member/NaverLogin',
      name: 'naver-login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/NaverLoginView.vue'),
      meta: { layout: SimpleLayout },
    },
    {
      path: '/Api/Member/Oauth20',
      name: 'naver-login-success',

      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/OauthView.vue'),
      meta: { layout: SimpleLayout },
    },
  ],
})

export default router

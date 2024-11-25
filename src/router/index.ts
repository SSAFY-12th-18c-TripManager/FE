import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '../layout/DefaultLayout.vue'
import SimpleLayout from '../layout/SimpleLayout.vue'
import MainView from '../views/MainView.vue'
import RecorderView from '../views/RecorderView.vue'
import RoomListView from '../views/RoomListView.vue'
import RoomList from '../components/RoomList.vue'
import RoomDetail from '../components/RoomDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: MainView,
      meta: { layout: SimpleLayout },
    },
    {
      path: '/recorder',
      name: 'recorder',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: RecorderView,
      meta: { layout: DefaultLayout },
    },
    {
      path: '/room',
      name: 'room',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: RoomListView,
      children: [
        {
          path: 'list',
          name: 'room-list',
          component: RoomList,
        },
        {
          path: 'detail/:roomId',
          name: 'room-detail',
          component: RoomDetail,
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

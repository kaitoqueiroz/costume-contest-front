import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Recover from '@/pages/Recover';
import Reset from '@/pages/Reset';
import Vote from '@/pages/Vote';
import Profile from '@/pages/Profile';
import Ranking from '@/pages/Ranking';
import PageNotFound from '@/pages/PageNotFound';

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/vote',
      meta: {
        public: false
      },
      name: 'vote',
      component: Vote
    },
    {
      path: '/profile',
      meta: {
        public: false
      },
      name: 'profile',
      component: Profile
    },
    {
      path: '/',
      meta: {
        public: false
      },
      name: 'ranking',
      component: Ranking
    },
    {
      path: '/login',
      meta: {
        public: true
      },
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      meta: {
        public: true
      },
      name: 'register',
      component: Register
    },
    {
      path: '/recover',
      meta: {
        public: true
      },
      name: 'recover',
      component: Recover
    },
    {
      path: '/reset',
      meta: {
        public: true
      },
      name: 'reset',
      component: Reset
    },
    {
      path: '*',
      meta: {
        public: true
      },
      name: '404',
      component: PageNotFound
    },
  ]
});

router.beforeEach((to, from, next) => {
  if(!localStorage.token && !to.meta.public){
    next('/login');
    return;
  }
  next();
});

export default router;
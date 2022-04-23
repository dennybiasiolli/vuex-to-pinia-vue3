import { createRouter, createWebHashHistory } from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
import About from '@/components/About.vue'


const routes = [
  {
    path: '/',
    component: HelloWorld,
    props: { msg: 'Welcome to Your Vue.js App' },
  },
  {
    path: '/about',
    component: About,
  },
]

export default createRouter({
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})

import { createRouter, createWebHashHistory } from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
import About from '@/components/About.vue'
import Counter from '@/components/Counter.vue'


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
  {
    path: '/counter',
    component: Counter,
  },
]

export default createRouter({
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})

import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: Home
		},
		{
			path: '/about',
			component: () => import('../views/About.vue')
		},
		{
			path: '/login',
			component: () => import('../views/Login.vue')
		  },
		  {
			path: '/register',
			component: () => import('../views/Register.vue')
		  },
		  {
			path: '/myhome',
			component: () => import('../views/MyHome.vue')
		  }
	],
})

export default router
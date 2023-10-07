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
		  },
		  {
			path: '/mySpaces',
			component: () => import('../views/MySpaces.vue')
		  },
		  {
			path: '/requests',
			component: () => import('../views/Requests.vue')
		  },
		  {
			path: '/dea/:id',
			name: 'Dea',
			component: () => import('../views/DEA.vue')
		  },
		  {
			path: '/spaces',
			component: () => import('../views/Spaces.vue')
		  },
		  {
			path: '/requestAdministration',
			component: () => import('../views/RequestAdministration.vue')
		  },
		  {
			path: '/campus',
			name: 'campus',
			component: () => import('../views/Campus.vue')
		  }
		  
	],
})

export default router
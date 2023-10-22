import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name:'home',
			component: Home
		},
		{
			path: '/about',
			component: () => import('../views/About.vue')
		},
		{
			path: '/campusData',
			name: 'campusData',
			component: () => import('../views/CampusData.vue')
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
			path: '/swornDeclaration/:id',
			name: 'swornDeclaration',
			component: () => import('../views/SwornDeclaration.vue')
		  },
		  {
			path: '/mySpaces',
			name: 'mySpaces',
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
			path: '/showSwornDeclaration',
			name: 'showSwornDeclaration',
			component: () => import('../views/ShowSwornDeclaration.vue'),
			props: (route) => ({
			  declaration: JSON.parse(route.query.declaration),
			}),
		  },
		  
		  {
			path: '/adminManagment',
			component: () => import('../views/AdminManagment.vue')
		  },
		  {
			path: '/certManagment',
			component: () => import('../views/CertManagment.vue')
		  },
		  {
			path: '/managmentLogin',
			component: () => import('../views/ManagmentLogin.vue')
		  },
		  {
			path: '/registerStaff',
			component: () => import('../views/RegisterStaff.vue')
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
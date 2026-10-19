import { createRouter, createWebHistory } from 'vue-router'
import MoviesList from '../views/MoviesList.vue'
import Movie from '../views/Movie.vue'
import Login from '../views/Login.vue';
import Logout from '../views/Logout.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: '/movies',
    component: MoviesList
  },
  {
    path: '/',
    component: MoviesList
  },
  {
    path: '/movies/:id',
    component: Movie
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout
  }
  ],
})


// router.beforeEach((to) => { // s'exécute avant chaque navigation, "tot" représente la route vers laquelle on veut aller
//   const user = JSON.parse(localStorage.getItem('user')) // 

//   if (to.meta.requiresAuth && !user?.token) { // vérifie si cette route est déclarée comme privée, user?token vérifie si on token existe ds l'objet user
//     return '/login' // redirige vers la page de connexion si l'user n'est pas authentifié
//   }
// })

export default router

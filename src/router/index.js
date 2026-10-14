import { createRouter, createWebHistory } from 'vue-router'
import MoviesList from '../views/MoviesList.vue'
import Movie from '../views/Movie.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [    {
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
}
  ],
})

export default router

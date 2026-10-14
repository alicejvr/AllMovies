<script>
import Search from '@/components/Search.vue';

export default {
  name: 'App',
  components: {
    Search
  },

  methods: {
    searchMovies(criteria) {
      this.$router.push({ // demande à Vue Router d'aller vers /movies en ajoutant les critères dans l'URL
        path: '/movies',
        query: {
          search: criteria.text,
          type: criteria.type,
          genreId: criteria.genreId
        }
      })
    },
    goHome() {
      this.$router.replace('/movies')
    }
  }
}
</script>


<template>

  <header class="header">

    <!-- logo -->
    <RouterLink to="/movies" class="logo">
      <img src="../public/logo.png" alt="Retour à l'accueil">
    </RouterLink>

    <!-- barre de recherche -->
    <Search @search="searchMovies" @clear-search="goHome" />

  </header>

  <!-- contenu de la page -->
  <main>
    <router-view></router-view>
  </main>

  <!-- footer -->
  <footer class="footer">
    <p>AllMovies — Votre catalogue de films</p>
    <p>© 2026 AllMovies. Tous droits réservés.</p>
  </footer>
</template>



<style scoped>
main {
  flex: 1;
}

.header {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 1rem 2rem;
  border-bottom: solid 0.1em rgb(176, 182, 187);
}

.logo {
  flex-shrink: 0;
}

img {
  width: 12em;
  display: block;
}

.footer {
  background-color: #d5dbe6;
  color: #4b464a;
  text-align: center;
  padding: 1rem;
  margin-top: 2rem;
  border-top: 1px solid rgb(176, 182, 187);
}

.footer p {
  margin: 0.4rem;
  font-size: 0.9rem;
}
</style>
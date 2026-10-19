<script>
import Search from '@/components/Search.vue';
import { PhSignIn } from '@phosphor-icons/vue';
import { PhUserCircle } from '@phosphor-icons/vue';
import { PhSignOut } from '@phosphor-icons/vue';

export default {
  name: 'App',
  components: {
    Search,
    PhUserCircle,
    PhSignOut,
    PhSignIn
  },

  data() {
    const user = JSON.parse(localStorage.getItem('user'))

    return {
      isLoggedIn: !!user, // récupère les infos de l'utilisateur - !! transforme le résultat en boolean (true si une valeur existe)
      username: user?.user?.username || '' // récup les données, transforme le txt en  objet JS, '?.username'  récupère le username si l'objet existe
    }; // || '' utilise une chaîne vide si aucun nom n'est disponible.
  },

  mounted() {
    window.addEventListener('auth-change', this.updateAuth); // écoute l'événement auth-change pour détecter les changements de connexion
  },
  beforeUnmount() {
    window.removeEventListener('auth-change', this.updateAuth); // supprime l'écouteur lorsque le composant est détruit
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
    },

    updateAuth() {
      const user = JSON.parse(localStorage.getItem('user'));
      this.isLoggedIn = !!user;
      this.username = user?.user?.username || '' // actualise isLoggingIn selon le contenu du localStorage
    }
  }
}
</script>


<template>

  <header class="header">

    <!-- logo -->
    <RouterLink to="/movies" class="logo">
      <img src="../logo.png" alt="Retour à l'accueil">
    </RouterLink>

    <!-- barre de recherche -->
    <Search @search="searchMovies" @clear-search="goHome" />

    <!-- Non connecté : icône et texte -->
    <RouterLink v-if="!isLoggedIn" to="/login" aria-label="Se connecter" class="login-icon">
      <PhSignIn :size="45" />
      <span>Se connecter</span>
    </RouterLink>

    <!-- Connecté : icône utilisateur et nom -->
    <RouterLink v-else to="/profile" aria-label="Mon profil" class="login-icon">
      <PhUserCircle :size="45" />
      <span>{{ username }}</span>
    </RouterLink>

    <RouterLink v-if="isLoggedIn" to="/logout" aria-label="Déconnexion" class="logout-icon">
      <!-- bouton apparait si user connecté -->
      <PhSignOut :size="40" />
    </RouterLink>


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
  min-width: 0;
}

.header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
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
  width: 100%;
  box-sizing: border-box;
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

.login-icon,
.logout-icon {
  color: black;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-left: auto;
  gap: 8px;
}

.login-icon:hover,
.logout-icon:hover {
  color: #d99500
}

@media (max-width: 425px) {
  .header {
    gap: 0.75rem;
    padding: 1rem;
    flex-wrap: wrap;
  }

  .header> :deep(form) {
    flex: 1 1 100%;
  }
}
</style>
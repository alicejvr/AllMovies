<template>
    <div class="logout-box">
        <h1>Déconnexion</h1>

        <p>Vous êtes maintenant déconnecté(e).</p>

        <p>
            <RouterLink to="/movies">Retour à l'accueil</RouterLink>
        </p>

    </div>
</template>


<script>
import AuthService from '../services/auth.service.js';

export default {
    name: 'Logout',

    mounted() {
        // supprime les informations de l'utilisateur du localStorage
        AuthService.logout();
        // informe l'application que l'utilisateur vient de se déconnecter
        window.dispatchEvent(new Event('auth-change'));
    }
};
</script>


<style scoped>
.logout-box {
    max-width: 400px;
    margin: 50px auto;
    padding: 25px;
    border: 1px solid #ddd;
    border-radius: 8px;
}

h1 {
    text-align: center;
    margin-bottom: 25px;
}

p {
    text-align: center;
}
</style>

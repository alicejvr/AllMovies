<template>
    <div class="signup-box">
        <h1>Créer un compte</h1>

        <form @submit.prevent="signup">
            <div class="form-group">
                <label for="username">Nom d'utilisateur</label>
                <input id="username" v-model="user.username" type="text" required autocomplete="username" />
            </div>

            <div class="form-group">
                <label for="email">Adresse e-mail</label>
                <input id="email" v-model="user.email" type="email" required autocomplete="email" />
            </div>

            <div class="form-group">
                <label for="password">Mot de passe</label>
                <input id="password" v-model="user.plainPassword" type="password" required
                    autocomplete="new-password" />
            </div>

            <div class="form-group">
                <label for="confirmPassword">Confirmer le mot de passe</label>
                <input id="confirmPassword" v-model="confirmPassword" type="password" required
                    autocomplete="new-password" />
            </div>

            <p v-if="error" class="error">{{ error }}</p>

            <button type="submit">Créer mon compte</button>
        </form>

        <p class="login-link">
            Déjà inscrit(e) ?
            <RouterLink to="/login">Se connecter</RouterLink>
        </p>

    </div>
</template>


<script>
import AuthService from '../services/auth.service.js';

export default {
    name: 'Signup',

    data() {
        return {
            user: {
                username: '',
                email: '',
                password: ''
            },
            confirmPassword: '',
            error: ''
        };
    },

    methods: {
        signup() {
            this.error = '';

            if (this.user.plainPassword !== this.confirmPassword) {
                this.error = 'Les mots de passe ne correspondent pas.';
                return;
            }

            AuthService.signup(this.user)
                .then(() => {
                    this.$router.push('/login');
                })
                .catch(() => {
                    this.error = 'Impossible de créer le compte.';
                });
        }
    }
};


</script>


<style scoped>
.signup-box {
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

.form-group {
    margin-bottom: 18px;
}

label {
    display: block;
    margin-bottom: 6px;
}

input {
    box-sizing: border-box;
    width: 100%;
    padding: 10px;
    border: 1px solid #bbb;
    border-radius: 4px;
}

button {
    display: block;
    margin-left: auto;
    font-family: "Open Sans", sans-serif;
    font-size: 13px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #000;
    background-color: #fff;
    cursor: pointer;
    border: 2px solid #000;
    padding: 10px 14px;
    box-shadow: 1px 1px 0 #000,
        2px 2px 0 #000,
        3px 3px 0 #000;
    transition: transform 0.1s, box-shadow 0.1s;
}

button:hover {
    background-color: #d5dbe6;
}

button:active {
    transform: translate(3px, 3px);
    box-shadow: 0 0 0 #000;
}

.error {
    color: #c62828;
    margin-bottom: 15px;
}

.login-link {
    margin-top: 2.5em;
    text-align: center;
}
</style>

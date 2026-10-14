<template>
    <div class="login-box">
        <h1>Connexion</h1>

        <form @submit.prevent="login">
            <div class="form-group">
                <label for="email">Adresse e-mail</label>
                <input id="email" type="email" v-model="email" required />
            </div>

            <div class="form-group">
                <label for="password">Mot de passe</label>
                <input id="password" type="password" v-model="password" required />
            </div>

            <p v-if="errorMessage" class="error">
                {{ errorMessage }}
            </p>

            <button type="submit" :disabled="loading">
                {{ loading ? 'Connexion...' : 'Se connecter' }}
            </button>
        </form>
    </div>
</template>

<script>
import AuthService from '../services/auth.service.js';

export default {
    name: 'Login',

    data() {
        return {
            email: '',
            password: '',
            errorMessage: '',
            loading: false
        };
    },

    methods: {
        login() {
            this.errorMessage = '';
            this.loading = true;

            AuthService.login({
                email: this.email,
                password: this.password
            })
                .then(() => {
                    this.$router.push('/movies');
                })
                .catch(error => {
                    console.log('Erreur de connexion :', error);
                    console.log('Statut HTTP :', error.response?.status);
                    console.log('Réponse API :', error.response?.data);

                    this.errorMessage =
                        'Connexion impossible. Vérifiez vos identifiants.';
                })
                .finally(() => {
                    this.loading = false;
                });
        }
    }
};
</script>

<style scoped>
.login-box {
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

button:disabled {
    opacity: 0.6;
    cursor: wait;
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
</style>

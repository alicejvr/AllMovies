<template>
    <div class="logout-box">
        <h1>Déconnexion</h1>

        <p>Vous êtes déconnecté(e).</p>

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

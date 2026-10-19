import axios from 'axios';

// 1) créer une instance Axios (= outil configuré pour communiquer ac l'API) :

const api = axios.create({ // instance stockée ds constante "api", pr pouvoir l'utiliser ailleurs + facilement
    baseURL: import.meta.env.VITE_API_URL, // définit l'adresse de base de l'API (la valeur est récupérée depuis le fichier .env)
});

/* 2) intercepter les requêtes avant leur envoi :

api.interceptors.request : pr intervenir sur les requêtes envoyées par 'api' 
.use(...) indique  ce qu'il faut faire à chaque requête
config : contient les informations de la requête, comme son URL et ses en-têtes (headers)
=> avant qu'une requête parte vers l'API, le code vérifie si elle doit recevoir un jeton d'authentification */

api.interceptors.request.use(config => {
    const user = JSON.parse(localStorage.getItem('user')); // récupère la donnée appelée user, enregistrée ds le stockage local du nav
    // JSON.parse(...) : transforme le texte récupéré en objet JavaScript utilisable

    // 3) vérifier s'il faut envoyer le jeton :
    if (config.url !== '/api/auth' && user?.token) { // si  l'URL de la requête n'est pas api/auth ET si user existe et possède un jeton
        config.headers.Authorization = `Bearer ${user.token}` // alors on ajoute ce jeton à la requête
    }

    return config; // renvoie la configuration de la requête, éventuellement modifiée avec le jeton
});

export default api;
<template>
    <form @submit.prevent="searchMovies">

        <!-- Type de recherche -->
        <select v-model="searchType">
            <option value="titre">Par titre</option>
            <option value="genre">Par genre</option>
            <option value="act">Par acteur·actrice</option>
            <option value="realisateur">Par réalisateur·réalisatrice</option>
        </select>

        <!-- Champ texte pour le titre, l'acteur ou le réalisateur -->
        <input v-if="searchType !== 'genre'" id="searchText" type="text" v-model="searchText"
            placeholder="Rechercher...">

        <!-- Liste déroulante des genres -->
        <select v-if="searchType === 'genre'" v-model="selectedGenre">
            <option value="">Choisir un genre</option>

            <option v-for="genre in genres" :key="genre.id" :value="genre.id">
                {{ genre.label }}
            </option>
        </select>

        <button class="searchbutton" type="submit">
            Chercher
        </button>

        <button class="searchbutton" type="button" @click="clearSearch">
            Effacer la recherche
        </button>

    </form>
</template>




<script>
import api from '../api.js'

export default {
    data() {
        return {
            searchText: '',
            searchType: 'titre',
            genres: [],
            selectedGenre: ''
        }
    },

    mounted() {
        this.fetchGenres()
    },

    methods: {
        async fetchGenres() {
            try {
                const response = await api.get('/api/genres')

                this.genres = response.data.member

            } catch (error) {
                console.error('Erreur lors du chargement des genres :', error)
            }
        },

        searchMovies() {
            this.$emit('search', {
                text: this.searchText.trim(),
                type: this.searchType,
                genreId: this.selectedGenre
            })

            this.searchText = ''
        },

        clearSearch() {
            this.searchText = ''
            this.searchType = 'titre'
            this.selectedGenre = ''

            this.$emit('clear-search')
        }
    }
}
</script>


<style scoped>
form {
    display: flex;
    align-items: stretch;
    gap: 16px;
    flex-wrap: wrap;
    margin: 20px 0;
}

/* Champ de recherche */
input[type="text"] {
    font-family: "Open Sans", sans-serif;
    font-size: 16px;
    padding: 12px 16px;
    min-width: 250px;
    flex: 1;
    border: 2px solid #000;
    background-color: #fff;
    color: #000;
    box-shadow: 3px 3px 0 #000;
}

/* Liste déroulante */
select {
    font-family: "Open Sans", sans-serif;
    font-size: 15px;
    padding: 12px 14px;
    border: 2px solid #000;
    background-color: #fff;
    color: #000;
    box-shadow: 3px 3px 0 #000;
    cursor: pointer;
}

/* Boutons */
.searchbutton {
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

/* Effet au survol */
.searchbutton:hover {
    background-color: #d5dbe6;
}

/* Effet quand on clique */
.searchbutton:active {
    transform: translate(3px, 3px);
    box-shadow: 0 0 0 #000;
}

/* Adaptation aux petits écrans */
@media (max-width: 650px) {
    form {
        flex-direction: column;
        align-items: stretch;
        gap: 12px;
    }

    input[type="text"] {
        min-width: 0;
        box-sizing: border-box;
    }
}
</style>
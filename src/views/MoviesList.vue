<template>
    <p v-if="loading">Chargement...</p>

    <p v-else-if="error">{{ error }}</p>

    <section v-else>

        <div class="movies-list">
            <article v-for="movie in movies" :key="movie.id" class="movie-card">
                <!-- crée une carte pour chaque film -->

                <RouterLink :to="`/movies/${movie.id}`">
                    <!-- RouterLink rend la carte cliquable, movie.id construit unr URL différente pr chaque film -->
                    <h2>{{ movie.title }}</h2>
                    <img :src="movie.poster || '/no_img.jpg'" :alt="movie.title" />
                </RouterLink>

            </article>


        </div>


        <Pagination :current-page="currentPage" :total-pages="totalPages" @next-page="nextPage"
            @previous-page="previousPage" />

    </section>

</template>


<script>
import Movie from '../views/Movie.vue'
import api from '../api.js'
import Pagination from '@/components/Pagination.vue'

export default {
    components: {
        Movie,
        Pagination
    },

    data() {
        return {
            movies: [],
            currentPage: 1,
            moviesPerPage: 20,
            totalItems: 0,
            loading: true,
            error: null,
            searchText: '',
            searchType: 'titre',
            genreId: ''
        }
    },

    computed: {
        // Calcule automatiquement le nombre de pages
        totalPages() {
            return Math.ceil(this.totalItems / this.moviesPerPage)
        }
    },

    watch: {
        '$route.query': {
            immediate: true,
            handler() {
                this.readSearchCriteria()
                this.currentPage = 1
                this.fetchMovies()
            }
        }
    },

    methods: {


        async fetchMovies() {
            this.loading = true
            this.error = null

            try {
                let response

                // Recherche par genre
                if (this.searchType === 'genre' && this.genreId) {
                    response = await api.get(
                        `/api/genres/${this.genreId}/movies`,
                        {
                            params: {
                                itemsPerPage: this.moviesPerPage,
                                page: this.currentPage
                            }
                        }
                    )

                    this.movies = response.data.member
                    this.totalItems = response.data.totalItems
                }

                // Recherche par acteur ou réalisateur
                else if (
                    (this.searchType === 'act' ||
                        this.searchType === 'realisateur') &&
                    this.searchText.trim()
                ) {
                    // 1. Récupérer toutes les personnes correspondant au nom
                    const peopleResponse = await api.get('/api/people', {
                        params: {
                            fullName: this.searchText.trim(),
                            itemsPerPage: 100
                        }
                    })

                    const people = peopleResponse.data.member || []

                    if (people.length === 0) {
                        this.movies = []
                        this.totalItems = 0
                        this.error = 'Aucune personne trouvée avec ce nom.'
                        return
                    }

                    // 2. Récupérer les films de chaque personne
                    const movieLists = await Promise.all(
                        people.map(async (person) => {
                            const endpoint = this.searchType === 'act'
                                ? `/api/casts/${person.id}/movies`
                                : `/api/directors/${person.id}/movies`

                            try {
                                const personResponse = await api.get(endpoint, {
                                    params: {
                                        itemsPerPage: 100,
                                        page: 1
                                    }
                                })

                                return personResponse.data.member || []
                            } catch (error) {
                                // Une personne peut ne pas avoir de films
                                console.warn(
                                    `Films indisponibles pour ${person.fullName}`,
                                    error
                                )
                                return []
                            }
                        })
                    )

                    // 3. Regrouper tous les films dans un seul tableau
                    const allMovies = movieLists.flat()

                    // 4. Éviter les doublons
                    const uniqueMovies = [
                        ...new Map(
                            allMovies.map(movie => [
                                movie.id ?? movie['@id'],
                                movie
                            ])
                        ).values()
                    ]

                    // 5. Calculer le nombre total de films
                    this.totalItems = uniqueMovies.length

                    // 6. Appliquer la pagination aux résultats regroupés
                    const start = (this.currentPage - 1) * this.moviesPerPage

                    this.movies = uniqueMovies.slice(
                        start,
                        start + this.moviesPerPage
                    )

                    if (this.totalItems === 0) {
                        this.error = 'Aucun film trouvé pour ces personnes.'
                    }
                }

                // Recherche par titre ou affichage de tous les films
                else {
                    const params = {
                        itemsPerPage: this.moviesPerPage,
                        page: this.currentPage
                    }

                    if (this.searchType === 'titre' && this.searchText.trim()) {
                        params['title[]'] = this.searchText.trim()
                    }

                    response = await api.get('/api/movies', { params })

                    this.movies = response.data.member
                    this.totalItems = response.data.totalItems
                }

            } catch (err) {
                this.error = 'Impossible de récupérer les films.'
                console.error(err)
            } finally {
                this.loading = false
            }
        },

        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++
                this.fetchMovies()
            }
        },

        previousPage() {
            if (this.currentPage > 1) {
                this.currentPage--
                this.fetchMovies()
            }
        },

        // Récupère les critères de recherche dans l'URL
        readSearchCriteria() {
            this.searchText = this.$route.query.search || ''
            this.searchType = this.$route.query.type || 'titre'
            this.genreId = this.$route.query.genreId || ''
        }
    }
}
</script>


<style scoped>
.movie-card {
    text-align: center;
}

.movie-card img {
    transition: transform 0.3s ease;
    width: 90%;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
}

@media (prefers-reduced-motion: no-preference) {

    .movie-card img:hover,
    .movie-card img :focus-visible {
        transform: scale(1.1)
    }
}

.movies-list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 3em;
    padding: 5em;
}

.movie-card a {
    color: inherit;
    text-decoration: none;
}
</style>
<template>
    <div v-if="movie" class="movie-layout">

        <div class="movie-card">

            <div class="movie-poster">
                <img :src="movie.poster || '/no_img.jpg'" :alt="'Affiche de ' + movie.title" />

                <p class="rating" v-if="movie.imdb?.rating">
                    IMDb : {{ movie.imdb.rating }}/10
                </p>

                <p class="stars" v-if="movie.imdb?.rating">
                    {{ '★'.repeat(Math.round(Number(movie.imdb.rating) / 2)) }}{{ '☆'.repeat(5 -
                        Math.round(Number(movie.imdb.rating) / 2)) }}
                </p>
            </div>

            <div class="movie-info">

                <h1>{{ movie.title }}</h1>

                <p class="year">
                    {{ movie.year }}
                </p>

                <div class="info-block">
                    <strong>Genres :</strong>

                    <div class="tags">
                        <RouterLink v-for="genre in movie.genres" :key="genre.id" :to="{
                            path: '/movies',
                            query: {
                                type: 'genre',
                                genreId: genre.id
                            }
                        }" class="tag">
                            {{ genre.label }}
                        </RouterLink>
                    </div>
                </div>

                <div class="info-block">
                    <strong>Réalisation :</strong>

                    <div class="people-list">
                        <RouterLink v-for="director in movie.directors" :key="director.id" :to="{
                            path: '/movies',
                            query: {
                                type: 'realisateur',
                                search: director.fullName
                            }
                        }" class="person-link">
                            {{ director.fullName }}
                        </RouterLink>
                    </div>
                </div>

                <div class="info-block">
                    <strong>Avec :</strong>

                    <div class="people-list">
                        <RouterLink v-for="actor in movie.castMembers" :key="actor.id" :to="{
                            path: '/movies',
                            query: {
                                type: 'act',
                                search: actor.fullName
                            }
                        }" class="person-link">
                            {{ actor.fullName }}
                        </RouterLink>
                    </div>
                </div>

                <div class="info-block synopsis">
                    <strong>Synopsis</strong>
                    <p>{{ movie.plot || 'Aucun synopsis disponible.' }}</p>
                </div>

            </div>
        </div>

        <RouterLink to="/movies" class="back-link">
            <button class="back-button">Retour</button>
        </RouterLink>

    </div>

    <p v-else-if="error">{{ error }}</p>
    <p v-else>Chargement du film...</p>
</template>

<script>
import api from '../api.js'

export default {
    data() {
        return {
            movie: null,
            error: null
        }
    },

    async mounted() {
        try {
            const id = this.$route.params.id
            const response = await api.get(`/api/movies/${id}`)
            this.movie = response.data
        } catch (err) {
            this.error = 'Impossible de récupérer ce film.'
            console.error(err)
        }
    }
}
</script>

<style scoped>
.movie-layout {
    max-width: 1000px;
    margin: 2rem auto;
    padding: 0 1rem;
}

.movie-card {
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 2rem;
    padding: 2rem;
    background-color: #d5dbe6;
    border: 1px solid #ccc;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.movie-poster img {
    display: block;
    width: 100%;
    max-width: 280px;
    height: auto;
    margin: 0 auto;
    border-radius: 8px;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
}

.rating {
    margin: 1rem 0 0.25rem;
    text-align: center;
    font-weight: bold;
}

.stars {
    margin: 0;
    text-align: center;
    color: #d99500;
    font-size: 1.5rem;
    letter-spacing: 2px;
}

.movie-info h1 {
    margin: 0;
    font-size: 2rem;
    overflow-wrap: anywhere;
}

.year {
    margin-top: 0.5rem;
    color: #555;
}

.info-block {
    margin-top: 1.5rem;
}

.info-block strong {
    display: block;
    margin-bottom: 0.5rem;
}

.tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.tag {
    padding: 0.35rem 0.75rem;
    border-radius: 20px;
    background-color: #fff;
    color: #2d45c1;
    text-decoration: none;
    border: 1px solid #2d45c1;
}

.tag:hover {
    background-color: #2d45c1;
    color: white;
}

.people-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1rem;
}

.person-link {
    color: #2d45c1;
    text-decoration: underline;
    text-underline-offset: 3px;
}

.person-link:hover {
    color: #17277b;
}

.synopsis p {
    line-height: 1.7;
    white-space: pre-line;
}

.back-link {
    display: inline-block;
    margin-top: 1.5rem;
}

.back-link:hover {
    text-decoration: underline;
}

.back-button {
    font-family: "Open Sans", sans-serif;
    font-size: 16px;
    letter-spacing: 2px;
    text-decoration: none;
    text-transform: uppercase;
    color: #000;
    cursor: pointer;
    border: 3px solid;
    padding: 0.25em 0.5em;
    box-shadow: 1px 1px 0px 0px, 2px 2px 0px 0px, 3px 3px 0px 0px, 4px 4px 0px 0px, 5px 5px 0px 0px;
    position: relative;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
}

.back-button:hover {
    background-color: #d99500;
}

@media (max-width: 650px) {
    .movie-layout {
        margin: 1rem auto;
    }

    .movie-card {
        grid-template-columns: 1fr;
        gap: 1.5rem;
        padding: 1.25rem;
    }

    .movie-poster img {
        max-width: 220px;
    }

    .movie-info h1 {
        font-size: 1.6rem;
    }
}
</style>
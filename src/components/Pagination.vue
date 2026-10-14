<template>

    <nav class="pagination">
        <button class="navbutton" @click="$emit('previous-page')" :disabled="currentPage === 1">←</button>

        <span class="pages">
            Page {{ currentPage }} / {{ totalPages }}
        </span>

        <button class="navbutton" @click="$emit('next-page')" :disabled="currentPage === totalPages">→</button>

    </nav>

</template>


<script>
export default {
    props: {
        currentPage: Number,
        totalPages: Number
    },

    emits: ['previous-page', 'next-page']
}
</script>

<style>
.pages {
    font-family: "Open Sans", sans-serif;
    font-size: 16px;

}

.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1em;
    padding-bottom: 2em;
}

.navbutton {
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

button:active {
    box-shadow: 0px 0px 0px 0px;
    top: 5px;
    left: 5px;
}

@media (min-width: 768px) {
    button {
        padding: 0.25em 0.75em;
    }
}
</style>

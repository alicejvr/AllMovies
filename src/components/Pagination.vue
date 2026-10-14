<template>

    <nav class="pagination">

        <span @click="$emit('previous-page')" :class="{ disabled: currentPage === 1 }" aria-label="Page précédente">
            <PhArrowCircleLeft :size="40" class="arrow" />
        </span>

        <span class="pages">
            Page {{ currentPage }} / {{ totalPages }}
        </span>

        <span @click="$emit('next-page')" :class="{ disabled: currentPage === totalPages }" role="button" tabindex="0"
            aria-label="Page suivante">
            <PhArrowCircleRight :size="40" class="arrow" />
        </span>


    </nav>

</template>


<script>
import { PhArrowCircleRight } from '@phosphor-icons/vue';
import { PhArrowCircleLeft } from '@phosphor-icons/vue';

export default {
    components: {
        PhArrowCircleRight,
        PhArrowCircleLeft
    },
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

.arrow:hover {
    cursor: pointer;
    color: #d99500;
}

span.disabled {
    opacity: 0.4;
    pointer-events: none;
}

@media (min-width: 768px) {
    button {
        padding: 0.25em 0.75em;
    }
}
</style>

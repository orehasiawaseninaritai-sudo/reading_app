<script setup lang="ts">
    import type { Movie } from '~/types/movie';

    const route = useRoute();
    const { data: movie } = await useFetch<Movie>(`/api/movies/${route.params.id}`);

</script>

<template>
    <div v-if="movie">
        <h1>タイトル：{{ movie.title }}</h1>
        <p>監督： {{ movie.director }}</p>
        <p>状態： {{ movie.status }}</p>
        <p>評価： {{ movie.rating }}</p>
        <p>コメント： {{ movie.comment }}</p>
    </div>
    <p v-else>映画が見つかりませんでした</p>
</template>
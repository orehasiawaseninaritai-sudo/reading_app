<script setup lang="ts">
    import type { Book } from '~/types/book';
    
    const route = useRoute();
    const { data: book } = await useFetch<Book>(`/api/books/${route.params.id}`);

</script>

<template>
    <div v-if="book">
        <h1>タイトル：{{ book.title }}</h1>
        <p>著者： {{ book.author }}</p>
        <p>状態： {{ book.status }}</p>
        <p>評価： {{ book.rating }}</p>
        <p>コメント： {{ book.comment }}</p>
    </div>
    <p v-else>本が見つかりませんでした</p>
</template>
<script setup lang="ts">
    import type { Book } from '~/types/book';

    const { data: books } = await useFetch<Book[]>('/api/books');

    const getColor = (status: string): string => {
        if(status === '読了') {
            return 'success';
        } else if(status === '読書中') {
            return 'info';
        } else {
            return 'secondary';
        }
    }
</script>

<template>
    <div>
        <NuxtLink to="/books/new">新規登録</NuxtLink>
        <h1>本の一覧</h1>
        <DataTable :value="books">
            <Column field="title" header="タイトル">
                <template #body="slotProps">
                    <NuxtLink :to="`/books/${slotProps.data.id}`">{{ slotProps.data.title }}</NuxtLink>
                </template>
            </Column>
            <Column field="author" header="著者" />
            <Column field="status" header="ステータス">
                <template #body="slotProps">
                    <Tag :value="slotProps.data.status" :severity="getColor(slotProps.data.status)" />
                </template>
            </Column>
            <Column field="rating" header="評価">
                <template #body="slotProps">
                    <Rating v-if="slotProps.data.rating" :modelValue="slotProps.data.rating" readonly />
                    <span v-else>未評価</span>
                </template>
            </Column>
        </DataTable>
    </div>
</template>

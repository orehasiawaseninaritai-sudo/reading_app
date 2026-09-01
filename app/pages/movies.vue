<script setup lang="ts">
    import type { Movie } from '~/types/movie';

    const { data: movies } = await useFetch<Movie[]>('/api/movies'); 

    const getColor = (status: string): string => {
        if(status === '視聴済み') {
            return 'success';
        } else if(status === '視聴中') {
            return 'info';
        } else {
            return 'secondary';
        }
    }
</script>

<template>
    <div>
        <h1>映画一覧</h1>
        <DataTable :value="movies">
            <Column field="title" header="タイトル" />
            <Column field="director" header="監督" />
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
<script setup lang="ts">
    interface Book {
        id: number;
        title: string;
        author: string;
        status: string;
        rating: number;
    }

    const { data: books } = await useFetch('/api/books');

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
        <h1>本の一覧</h1>
        <DataTable :value="books">
            <Column field="title" header="タイトル" />
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

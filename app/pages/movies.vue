<script setup lang="ts">
    interface Movie {
        id: number;
        title: string;
        director: string;
        status: string;
        rating: number;
    }

    const movies: Movie[] = [
        { id: 1, title: '千と千尋の神隠し', director: '宮崎駿', status: '視聴済み', rating: 5},
        { id: 2, title: '君の名は', director: '新海誠', status: '視聴中', rating: 3},
        { id: 3, title: 'すずめの戸締まり', director: '新海誠', status: '未視聴', rating: 0}
    ]

</script>

<template>
    <div>
        <NuxtLink to="/">本の一覧ページへ</NuxtLink>
        <h1>映画一覧</h1>
        <DataTable :value="movies">
            <Column field="title" header="タイトル" />
            <Column field="director" header="監督" />
            <Column field="status" header="ステータス">
                <template #body="slotProps">
                    <Tag :value="slotProps.data.status" severity="info" />
                </template>
            </Column>
            <Column field="rating" header="評価">
                <template #body="slotProps">
                    <Rating :modelValue="slotProps.data.rating" readonly />
                </template>
            </Column>
        </DataTable>
    </div>
    
</template>
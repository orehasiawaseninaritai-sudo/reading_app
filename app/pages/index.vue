<script setup lang="ts">
    interface Book {
        id: number
        title: string
        author: string
        status: string
        rating: number
    }

    const books: Book[] = [
        { id: 1, title: '吾輩は猫である', author: '夏目漱石', status: '読了', rating: 4 },
        { id: 2, title: 'ノルウェイの森', author: '村上春樹', status: '読書中', rating: 5 },
        { id: 3, title: '銀河鉄道の夜', author: '宮沢賢治', status: '未読', rating: 0 },
    ]
</script>

<template>
    <div>
        <h1>本の一覧</h1>
        <DataTable :value="books">
            <Column field="title" header="タイトル" />
            <Column field="author" header="著者" />
            <Column field="status" header="ステータス" />
            <Column field="rating" header="評価" />
        </DataTable>
    </div>
</template>

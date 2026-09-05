<script setup lang="ts">
    import type { Book } from '~/types/book';
    
    const route = useRoute();
    const { data: book, refresh } = await useFetch<Book>(`/api/books/${route.params.id}`);

    const isEditing = ref(false);

    const editForm = ref({
        status: '',
        rating: 0,
        comment: '',
    });

    function startEdit() {
        if (!book.value) return;

        editForm.value.status = book.value.status;
        editForm.value.rating = book.value.rating ?? 0;
        editForm.value.comment = book.value.comment ?? '';
        isEditing.value = true;
    }

    async function save() {
        await $fetch(`/api/books/${route.params.id}`, {
            method: 'PUT',
            body: editForm.value,
        });
        await refresh();
        isEditing.value = false;
    }


</script>

<template>
    <div v-if="book">
        <div v-if="!isEditing">
            <h1>タイトル：{{ book.title }}</h1>
            <p>著者： {{ book.author }}</p>
            <p>状態： {{ book.status }}</p>
            <p>評価： {{ book.rating }}</p>
            <p>コメント： {{ book.comment }}</p>
            <Button label="編集" @click="startEdit" />
        </div>

        <div v-else>
            <h1>タイトル：{{ book.title }}</h1>
            <p>著者： {{ book.author }}</p>
            <div>
                <label for="status">状態</label>
                <Select v-model="editForm.status" :options="['未読', '読書中', '読了']" id="status" />
            </div>
            <div>
                <label for="rating">評価</label>
                <InputNumber v-model="editForm.rating" :min="1" :max="5" id="rating" />
            </div>
            <div>
                <label for="comment">コメント</label>
                <Textarea v-model="editForm.comment" id="comment" />
            </div>
            <Button label="保存" @click="save" />
            <Button label="キャンセル" @click="isEditing = false" />
        </div>
    </div>
    <p v-else>本が見つかりませんでした</p>
</template>
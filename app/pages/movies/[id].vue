<script setup lang="ts">
    import type { Movie } from '~/types/movie';

    const route = useRoute();
    const { data: movie, refresh } = await useFetch<Movie>(`/api/movies/${route.params.id}`);

    const isEditing = ref(false);

    const editForm = ref({
        status: '',
        rating: 0,
        comment: '',
    });

    function startEdit() {
        if (!movie.value) return;

        editForm.value.status = movie.value.status;
        editForm.value.rating = movie.value.rating ?? 0;
        editForm.value.comment = movie.value.comment ?? '';
        isEditing.value = true;
    }

    async function save() {
        await $fetch(`/api/movies/${route.params.id}`, {
            method: 'PUT',
            body: editForm.value,
        });
        await refresh();
        isEditing.value = false;
    }
</script>

<template>
    <div v-if="movie">
        <div v-if="!isEditing">
            <h1>タイトル：{{ movie.title }}</h1>
            <p>監督： {{ movie.director }}</p>
            <p>状態： {{ movie.status }}</p>
            <p>評価： {{ movie.rating }}</p>
            <p>コメント： {{ movie.comment }}</p>
            <Button label="編集" @click="startEdit" />
        </div>
        <div v-else>
            <h1>タイトル：{{ movie.title }}</h1>
            <p>監督： {{ movie.director }}</p>
            <div>
                <label for="status">状態</label>
                <Select v-model="editForm.status" :options="['未視聴', '視聴中', '視聴済み']" id="status" />
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
    <p v-else>映画が見つかりませんでした</p>
</template>
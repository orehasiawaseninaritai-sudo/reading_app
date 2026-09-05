<script setup lang="ts">
    const form = ref({
        title: '',
        director: '',
        status: '未視聴',
        rating: 0,
        comment: ''
    });

    async function save() {
        await $fetch('/api/movies', {
            method: 'POST',
            body: form.value
        })

        await navigateTo('/movies');
    };
</script>


<template>
    <h1>映画の新規登録</h1>
    <div>
        <label for="title">タイトル</label>
        <InputText v-model="form.title" id="title" />
    </div>
    <div>
        <label for="director">監督</label>
        <InputText v-model="form.director" id="director" />
    </div>
    <div>
        <label for="status">状態</label>
        <Select v-model="form.status" :options="['未視聴', '視聴中', '視聴済み']" id="status" />
    </div>
    <div>
        <label for="rating">評価</label>
        <Rating v-model="form.rating" id="rating" />
    </div>
    <div>
        <label for="comment">コメント</label>
        <Textarea v-model="form.comment" id="comment" />
    </div>
    <Button label="保存" @click="save" />
</template>
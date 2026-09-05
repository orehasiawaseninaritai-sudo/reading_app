<script setup lang="ts">
    const form = ref({
        title: '',
        author: '',
        status: '未読',
        rating: 0,
        comment: ''
    })

    async function save() {
        await $fetch('/api/books', {
            method: 'POST',
            body: form.value
        })

        await navigateTo('/')
    }


</script>

<template>
    <h1>本の登録</h1>
    <div>
        <label for="title">タイトル</label>
        <InputText v-model="form.title" id="title" />
    </div>
    <div>
        <label for="author">著者</label>
        <InputText v-model="form.author" id="author" />
    </div>
    <div>
        <label for="status">状態</label>
        <Select v-model="form.status" :options="['未読', '読書中', '読了']" id="status" />
    </div>
    <div>
        <label for="rating">評価</label>
        <Rating v-model="form.rating" :min="1" :max="5" id="rating" />
    </div>
    <div>
        <label for="comment">コメント</label>
        <Textarea v-model="form.comment" id="comment" />
    </div>
    <Button label="保存" @click="save" />
</template>
<script setup lang="ts">
    import { signOut } from 'firebase/auth';

    const user = useAuthUser();
    const { $auth } = useNuxtApp();

    async function signOutUser() {
        await signOut($auth);
        await navigateTo('/login');
    }
</script>

<template>
    <div>
        <NuxtLink to="/">本の一覧ページへ</NuxtLink>
        <NuxtLink to="/movies">映画一覧ページへ</NuxtLink>
        <div v-if="user">
            <span>{{ user.email }}</span>
            <Button label="ログアウト" @click="signOutUser" />
        </div>
        <slot />
    </div>
</template>
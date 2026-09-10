<script setup lang="ts">
    import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
    import { FirebaseError } from 'firebase/app';

    const email = ref('');
    const password = ref('');
    const message = ref('');
    const { $auth } = useNuxtApp();

    const mode = ref<'login' | 'signup'>('login');

    async function submit() {
        if (mode.value === 'login') {
            await login();
        } else {
            await signup();
        }
    }

    async function login() {
        if(email.value === '' || password.value === '') {
            message.value = 'メールアドレスとパスワードを両方入力してください。';
            return;
        }

        try {
            await signInWithEmailAndPassword($auth, email.value, password.value);
            await navigateTo('/');
        } catch (e) {
            if(e instanceof FirebaseError) {
                if(e.code === 'auth/invalid-email') {
                    message.value = '無効なメールアドレスです。';
                } else if(e.code === 'auth/too-many-requests') {
                    message.value = 'アカウントが一時的にロックされています。しばらくしてから再度お試しください。';
                } else if(e.code === 'auth/invalid-credential') {
                    message.value = 'メールアドレスまたはパスワードが正しくありません。';
                } else {
                    message.value = 'エラーが発生しました。';
                }
            }
            
        }
    }

    async function signup() {
        if (email.value === '' || password.value === '') {
            message.value = 'メールアドレスとパスワードを両方入力してください。';
            return;
        }

        try {
            await createUserWithEmailAndPassword($auth, email.value, password.value);
            await navigateTo('/');
        } catch (e) {
            if(e instanceof FirebaseError) {
                if(e.code === 'auth/email-already-in-use') {
                    message.value = 'このメールアドレスは既に使用されています。';
                } else if(e.code === 'auth/invalid-email') {
                    message.value = '無効なメールアドレスです。';
                } else if(e.code === 'auth/weak-password') {
                    message.value = 'パスワードは6文字以上である必要があります。';
                } else {
                    message.value = 'エラーが発生しました。';
                }
            }
            
        }
    }

    function toggleMode() {
        mode.value = mode.value === 'login' ? 'signup' : 'login';
    }
</script>

<template>
    <div>
        <h1>{{ mode === 'login' ? 'ログイン' : '新規登録' }}</h1>
        <InputText v-model="email" type="email" placeholder="Email" />
        <InputText v-model="password" type="password" placeholder="Password" />
        <Button :label="mode === 'login' ? 'ログイン' : '新規登録'" @click="submit" /><br />
        <span v-if="message">{{ message }}</span><br />
        <a href="#" @click.prevent="toggleMode">
            {{ mode === 'login' ? '新規登録はこちら' : 'ログインはこちら' }}
        </a>
        
    </div>

</template>
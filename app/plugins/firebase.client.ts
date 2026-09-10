import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth'

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()

    const firebaseApp = initializeApp({
        apiKey: config.public.firebaseApiKey,
        authDomain: config.public.firebaseAuthDomain,
        projectId: config.public.firebaseProjectId,
        appId: config.public.firebaseAppId
    })

    const auth = getAuth(firebaseApp)

    const authUser = useState<User | null>('authUser', () => null)
    onAuthStateChanged(auth, (user) => {
        authUser.value = user
    })

    return {
        provide: {
            auth
        }
    }
})

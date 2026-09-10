import type { User } from 'firebase/auth'

export function useAuthUser() {
    return useState<User | null>('authUser', () => null)
}

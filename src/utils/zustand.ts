import { User } from "@prisma/client"
import create from "zustand"
import { persist, devtools } from "zustand/middleware"

interface UserState {
  user: User | null
  setUser: (data: User | null) => void
  getUser: () => User
  removeUser: () => void
}

export const useStore = create<UserState>()(
  devtools(
    persist((set, get) => ({
      user: {} as User,
      setUser: (data: User | null) => set(() => ({ user: data ? data : null })),
      getUser() {
        return get().user as User
      },
      removeUser: () => set(() => ({ user: {} as User })),
    }))
  )
)

import { User } from "@prisma/client"
import create from "zustand"
import { persist, devtools } from "zustand/middleware"

interface UserState {
  user: User
  setUser: (data: User) => void
  getUser: () => User
  removeUser: () => void
}

export const useStore = create<UserState>()(
  devtools(
    persist((set, get) => ({
      user: {} as User,
      setUser: (data: User) => set(() => ({ user: data })),
      getUser() {
        return get().user as User
      },
      removeUser: () => set(() => ({ user: {} as User })),
    }))
  )
)

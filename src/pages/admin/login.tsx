import { useForm, SubmitHandler } from "react-hook-form"
import { useRouter } from "next/router"

import { setCredentials } from "@/app/features/auth/authSlice"
import { useAppDispatch } from "@/app/hooks"
import { useLoginMutation } from "@/app/services/userApi"
import { Login } from "@/types/user"

const LoginPage = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const [login] = useLoginMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>()

  const onLoginSubmit: SubmitHandler<Login> = async (data) => {
    try {
      const user = await login(data).unwrap()
      dispatch(setCredentials(user))
      if (user) {
        router.push("/admin")
      }
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <div className="container-flex">
      <h1 className="title">Login</h1>
    </div>
  )
}

export default LoginPage

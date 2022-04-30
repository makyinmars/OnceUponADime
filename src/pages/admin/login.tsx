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
      <div className="container-form">
        <form
          onSubmit={handleSubmit(onLoginSubmit)}
          className="grid grid-cols-1 gap-1"
        >
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", { required: "The email is required" })}
            className="input"
          />
          {errors.email && <p className="error-form">{errors.email.message}</p>}

          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password", {
              required: "The password is required!",
              minLength: {
                value: 6,
                message: "The password must be at least 8 characters long",
              },
            })}
            className="input"
          />
          {errors.password && (
            <p className="error-form">{errors.password.message}</p>
          )}

          <button type="submit" className="button">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage

import { useForm, SubmitHandler } from "react-hook-form"
import { useRouter } from "next/router"

import { setCredentials } from "@/app/features/auth/authSlice"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { useRegisterUserMutation } from "@/app/services/userApi"
import { Register } from "@/types/user"
import { useEffect } from "react"
import Error from "@/components/common/error"
import Spinner from "@/components/common/spinner"

const RegisterPage = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const user = useAppSelector((state) => state.auth.user)

  const [registerUser, { isError, error, isLoading }] =
    useRegisterUserMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Register>()

  const onRegisterSubmit: SubmitHandler<Register> = async (data) => {
    try {
      const user = await registerUser(data).unwrap()
      dispatch(setCredentials(user))
      if (user) {
        router.push("/admin")
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (user && user.admin === false) {
      router.push("/")
    }
  }, [error, isError, isLoading, user, router])

  return (
    <div className="container-flex">
      <h1 className="title">Register</h1>
      <div className="container-form">
        <form
          onSubmit={handleSubmit(onRegisterSubmit)}
          className="grid grid-cols-1 gap-1"
        >
          <label htmlFor="name" className="label">
            Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name", { required: "The name is required!" })}
            className="input"
          />
          {errors.name && <p className="error-form">{errors.name.message}</p>}

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
                message: "The password must be at least 6 characters long",
              },
            })}
            className="input"
          />
          {errors.password && (
            <p className="error-form">{errors.password.message}</p>
          )}

          <button type="submit" className="button">
            Register
          </button>
          {isLoading && <Spinner />}
          {isError && <Error error={error} />}
        </form>
      </div>
    </div>
  )
}

export default RegisterPage

import { useForm, SubmitHandler } from "react-hook-form";

import { setCredentials } from "@/app/features/auth/authSlice";
import { useAppDispatch } from "@/app/hooks";
import { useRegisterUserMutation } from "@/app/services/userApi";
import { Register } from "@/types/user";

const Admin = () => {
  const dispatch = useAppDispatch();

  const [registerUser, { isLoading, error, isError, isSuccess }] =
    useRegisterUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Register>();

  const onRegisterSubmit: SubmitHandler<Register> = async (data) => {
    try {
      const user = await registerUser(data).unwrap();
      dispatch(setCredentials(user));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onRegisterSubmit)}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          {...register("name", { required: "The name is required!" })}
        />
        {errors.name && <p>{errors.name.message}</p>}

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          {...register("email", { required: "The email is required" })}
        />
        {errors.email && <p>{errors.email.message}</p>}

        <label htmlFor="password">Password</label>
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
        />
        {errors.password && <p>{errors.password.message}</p>}

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Admin;

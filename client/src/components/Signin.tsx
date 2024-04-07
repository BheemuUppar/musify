import { useEffect } from "react";
import logo from "../assets/images/icon.png";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { environment } from "../assets/environment";
function Signin() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm();

  const onSubmit: SubmitHandler<any> = (data) => {
    login(data);
  };

  async function login(payload: any) {
    axios.post(`${environment.baseUrl}/auth/signin`, payload).then((res) => {
      alert(res.data.message);
    });
  }

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <div className="form-container w-[20%] min-w-[300px] h-[60%] bg-red-50 flex justify-center items-center flex-col gap-2 rounded   py-5 ">
        <div className="flex items-center justify-between ">
          {/* <h2 className="text-gray-400">Log in</h2> */}
          <img src={logo} className="h-[50px] w-[50px]" alt="logo" />
        </div>
        <form
          className="flex flex-col justify-center items-center gap-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            placeholder="Email"
            type="email"
            id="email"
            className="bg-[transparent] border border-blue-950 p-1 rounded w-full pl-2 py-2 "
            {...register("email", { required: true })}
          />
          <input
            placeholder="Password"
            type="password"
            id="password"
            className="bg-[transparent] border border-blue-950 p-1 rounded w-full"
            {...register("password", { required: true, minLength: 6 })}
          />

          <button
            type="submit"
            className="bg-green-500  hover:bg-green-700 rounded w-[40%] text-black p-1"
            disabled={!isDirty || !isValid}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signin;

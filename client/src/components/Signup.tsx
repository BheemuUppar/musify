import axios from "axios";
import logo from "../assets/images/icon.png";
import { SubmitHandler, useForm } from "react-hook-form";
import { environment } from "../assets/environment";
import { useNavigate , Link } from "react-router-dom";


function Signup() {
  const navigate = useNavigate();
  const { register,  handleSubmit, watch, formState: { errors, isDirty, isValid },} = useForm();
 
  const onSubmit: SubmitHandler<any> = (data) => {
    delete data["cnf-password"];
    registerUser(data);
  };
  function registerUser(payload: any) {
    axios.post(`${environment.baseUrl}/auth/signup`, payload).then((res) => {
      alert(res.data.message);
      if (res.data.message === "user registered successfully") {
        navigate('/signin')
      }
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
          className="flex flex-col justify-center items-center gap-3 text-black"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            className="pl-2 py-2"
            placeholder="Username"
            {...register("username", { required: true })}
          />
          <input
            className="pl-2 py-2"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          <input
            className="pl-2 py-2"
            placeholder="Password"
            {...register("password", { required: true, minLength: 6 })}
          />
          <input
            className="pl-2 py-2"
            placeholder="confirm Password"
            {...register("cnf-password", { required: true, minLength: 6 })}
          />

          <button
            type="submit"
            className="bg-green-500  hover:bg-green-700 rounded w-[40%] text-black p-1"
            disabled={!isDirty || !isValid}
          >
            Sign in
          </button>
        </form>
        <Link to='/signin'>click here</Link>
      </div>
    </div>
  );
}

export default Signup;

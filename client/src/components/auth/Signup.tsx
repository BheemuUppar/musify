import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate , Link } from "react-router-dom";
import { snackbarAtom } from "../../store/otherState";
import { useSetRecoilState } from "recoil";
import { SingUpForm } from "../../types/User";

const baseUrl = import.meta.env.VITE_API_URL

type Inputs = {
  username: string
  email: string
  password:string
  cnf_password:string |undefined
}

function Signup() {
  const navigate = useNavigate();
  const { register,  handleSubmit, watch, formState: { errors, isDirty, isValid }} = useForm<Inputs>({ mode: "onChange" });
  const setSnackbarState = useSetRecoilState(snackbarAtom);

  const onSubmit: SubmitHandler<Inputs> = (data:Inputs) => {
    delete data["cnf_password"];
    console.log(errors)
    registerUser(data);
  };

  const  showNotification = function (props:{severity:string, message:string}){
    setSnackbarState(props)
  }

  function registerUser(payload: SingUpForm) {
    axios.post(`${baseUrl}/auth/signup`, payload).then((res) => {
      showNotification({severity:'success', message:res.data.message+', login to continue'})
      if (res.data.message === "user registered successfully") {
        navigate('/signin')
      }
    }).catch((error:any)=>{
      showNotification({severity:'error', message:error.response.data.message})
    });
  }

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <div className="form-container w-[20%] min-w-[300px] h-[60%] min-h-[300px] bg-[#e3e5eb] dark:bg-dark-500 flex justify-center items-center flex-col gap-2 rounded   py-5 ">
        <div className="flex items-center justify-between ">
          <h1 className="text-dark-600 dark:text-white text-lg">Sign Up</h1>
        </div>
        <form
          className="flex flex-col justify-center items-center gap-3 text-black"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col">
          <input
            className="pl-2 py-2 bg-transparent text-dark-600 dark:text-white border border-gary-500 rounded border-blue-950"
            placeholder="Username"
            {...register("username", { required: true ,})}
          />
          { errors.username &&  errors.username.type == "required" && <span className="text-red-500"> username is required</span> }
          </div>
          <div className="flex flex-col">

          <input
            className="pl-2 py-2  bg-transparent text-dark-600 dark:text-white border border-gary-500 rounded border-blue-950"
            placeholder="Email" type="email"
            {...register("email", { required: "Email is Required" ,pattern:{value:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, message:"Enter Valid Email Address"} })}
          />
  { errors.email && <span className="text-red-500"> {errors.email.message}</span> }

          </div>
          <div className="flex flex-col">

          <input
            className="pl-2 py-2  bg-transparent text-dark-600 dark:text-white border border-gary-500 rounded border-blue-950"
            placeholder="Password" type="password"
            {...register("password", { required: "password is Required", minLength: {value:6, message:"password should contain atleast 6 letters"} })}
          />
          { errors.password && <span className="text-red-500"> {errors.password.message}</span> }
          </div>
          <div className="flex flex-col">

          <input 
            className="pl-2 py-2  bg-transparent text-dark-600 dark:text-white border border-gary-500 rounded border-blue-950"
            placeholder="confirm Password" type="password"
            {...register("cnf_password", { required: "confirm password is required",
            validate: value => value == watch('password') || "Passwords do not match"
             })}
          />
          { errors.cnf_password && <span className="text-red-500"> {errors.cnf_password.message}</span> }
          </div>

          <button
            type="submit"
            className="bg-green-500  hover:bg-green-700 rounded w-[40%] text-black p-1"
            disabled={!isDirty || !isValid}
          >
            Sign in
          </button>
        </form>
        <span><Link to='/signin' className="text-blue-500">click here</Link> to sign up</span>
      </div>
    </div>
  );
}

export default Signup;

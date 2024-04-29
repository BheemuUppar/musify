import axios from "axios";
import logo from "../assets/images/icon.png";
import { SubmitHandler, useForm } from "react-hook-form";
import { environment } from "../../assets/environment";
import { useNavigate , Link } from "react-router-dom";
import { snackbarAtom } from "../../store/otherState";
import { useSetRecoilState } from "recoil";


function Signup() {
  const navigate = useNavigate();
  const { register,  handleSubmit, watch, formState: { errors, isDirty, isValid },} = useForm();
  const setSnackbarState = useSetRecoilState(snackbarAtom);

  const onSubmit: SubmitHandler<any> = (data) => {
    delete data["cnf-password"];
    registerUser(data);
  };

  const  showNotification = function (props:{severity:string, message:string}){
    setSnackbarState(props)
  }

  function registerUser(payload: any) {
    axios.post(`${environment.baseUrl}/auth/signup`, payload).then((res) => {
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
      <div className="form-container w-[20%] min-w-[300px] h-[60%] bg-[#e3e5eb] dark:bg-dark-500 flex justify-center items-center flex-col gap-2 rounded   py-5 ">
        <div className="flex items-center justify-between ">
          <h1 className="text-dark-600 dark:text-white text-lg">Sign Up</h1>
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
        <span><Link to='/signin' className="text-blue-500">click here</Link> to signin</span>
      </div>
    </div>
  );
}

export default Signup;

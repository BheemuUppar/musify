import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { isAuthenticatedAtom } from "../../store/authState";
import { snackbarAtom } from "../../store/otherState";


function Signin() {
  const baseUrl = import.meta.env.VITE_API_URL;
  const {
    register,  handleSubmit, watch,  formState: { errors, isDirty, isValid, isSubmitting }, } = useForm();
  const setAuthState = useSetRecoilState(isAuthenticatedAtom);
  const navigate = useNavigate();
  const setSnackbarState = useSetRecoilState(snackbarAtom);

  const onSubmit: SubmitHandler<any> = (data) => {
    login(data);
  };
  
  const  showNotification = function (props:{severity:string, message:string}){
    setSnackbarState(props)
  }

  async function login(payload: any) {
    axios.post(`${baseUrl}/auth/signin`, payload).then( (res) => {
      if(res.data.message == 'login successfull'){
         localStorage.setItem("username", res.data.username)
        localStorage.setItem("email", res.data.email)
        localStorage.setItem("token", res.data.token)
         setAuthState(true);
         showNotification({severity:'success', message:res.data.message})
        navigate('/home');
      }
      else{
        showNotification({severity:'error', message:res.data.message})
      }
    
    }).catch((error:any)=>{
      showNotification({severity:'error', message:error.response.data.message})
    });
  }

  return (
    <div className="w-full h-[100vh] flex justify-center items-center flex-col">
      <div className="form-container w-[20%] min-w-[300px] h-[60%] min-h-[300px] bg-[#e3e5eb] dark:bg-dark-500 flex justify-center items-center flex-col gap-2 rounded   py-5 ">
        <div className="flex items-center justify-between ">
          <h1 className="text-dark-600 dark:text-white text-lg">Sign In</h1>
        </div>
        <form
          className="flex flex-col justify-center items-center gap-3  text-black "
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
        <Link to="/signup" className="text-blue-700 underline">click here to register</Link>
      </div>
      <div className="w-[20%]" style={{fontFamily:"monospace"}}>
        if you want to test this project please use below credentials
        <p>username : test@gmail.com</p>
        <p>password : Test@123</p>
      </div>
    </div>
   
  );
}

export default Signin;

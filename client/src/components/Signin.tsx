import logo from "../assets/images/icon.png";

function Signin() {
  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <div className="form-container w-[20%] h-[40%] bg-red-50 flex justify-center items-center flex-col gap-2 rounded   py-5 ">
        <div className="flex items-center justify-between ">
            {/* <h2 className="text-gray-400">Log in</h2> */}
            <img src={logo} className="h-[50px] w-[50px]" alt="logo" />
        </div>
        <form className="flex flex-col justify-center items-center gap-3">
          <input
            placeholder="Email"
            type="email"
            id="email"
            className="bg-[transparent] border border-blue-950 p-1 rounded w-full "
          />
          <input
            placeholder="Password"
            type="password"
            id="password"
            className="bg-[transparent] border border-blue-950 p-1 rounded w-full"
          />

          <button
            type="submit"
            className="bg-green-500  hover:bg-green-700 rounded w-[40%] text-black p-1"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signin;

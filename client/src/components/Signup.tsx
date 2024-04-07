function Signup() {
  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <div className="form-container w-[30%]">
        <form className="flex flex-col justify-center items-center gap-3">
            {/* <label htmlFor="email">Email</label> */}
            <input placeholder="Email" type="email" id="email"  className="bg-[transparent] border border-blue-950 p-1 rounded w-full"/>
            {/* <label htmlFor="password">Password</label> */}
            <input placeholder="Password" type="password" id="password" className="bg-[transparent] border border-blue-950 p-1 rounded w-full" />
            {/* <label htmlFor="cnf-password">Confirm Password</label> */}
            <input placeholder="Confirm Password" type="password" id="cnf-password" className="bg-[transparent] border border-blue-950 p-1 rounded w-full" />
          <button type="submit" className="bg-green-500  hover:bg-green-700 rounded w-[40%] text-black p-1"> Sign Up</button>
        </form>
      </div>
    </div>
  );
}


export default Signup;

import React from "react";
const CardContent  = React.memo(({ children }: any)=> {
  return <div className=" card w-full rounded h-full p-2 bg-slate-800 text-white">
    {children}
    </div>;
})
export default CardContent;

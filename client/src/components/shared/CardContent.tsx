import React from "react";
const CardContent  = React.memo(({ children }: any)=> {
  return <div className=" card w-full rounded h-full p-2 dark:bg-dark-700 bg-[#d2d3db] text-dark dark:text-white">
    {children}
    </div>;
})
export default CardContent;

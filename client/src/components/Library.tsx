import React from "react";

const Library  = React.memo(()=> {
  console.log('library re-rendering...')
  return (<>
  this is Library
  </>);
})

export default Library;

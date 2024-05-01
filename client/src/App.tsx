import { useEffect } from 'react'
import './App.css'
import Routehandler from './components/RouteHandler'
import { RecoilRoot } from 'recoil'
function App() {
  useEffect(()=>{
    const handleKeyPress = (event:any) => {
      if (event.key === 'F11') {
        event.preventDefault(); // Prevent default behavior of F11 key (full-screen mode)
      }
    };
     // Add event listener when component mounts
     window.addEventListener('keydown', handleKeyPress);

     // Remove event listener when component unmounts
     return () => {
       window.removeEventListener('keydown', handleKeyPress);
     };
  }, [])
  return (
   <>
   <RecoilRoot>
      <Routehandler></Routehandler>
   </RecoilRoot>
   </>
  )
}

export default App

import './App.css'
import Routehandler from './components/RouteHandler'
import { RecoilRoot } from 'recoil'
import CustomizedSnackbars from './components/shared/Snackbar'
function App() {

  return (
   <>
   <RecoilRoot>
      <Routehandler></Routehandler>
      <CustomizedSnackbars />
   </RecoilRoot>
   </>
  )
}

export default App

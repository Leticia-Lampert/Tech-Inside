import {
  BrowserRouter,
  Routes,
  Route,
//   Switch,
  Navigate  
} from "react-router-dom";
import { useSelector } from 'react-redux'
import Home from "../pages/Home";
import Authentication from "../pages/Authentication"
import Answer from "../pages/Answer"
import UserAnswer from "../pages/UserAnswer"

const PrivateRoute = ({
    user,
    redirectPath = '/',
    children,
  }) => {
    console.log('user', user)
    if (!user) {
      return <Navigate to={redirectPath} replace />
    }
  
    return children
  }

function Router() {

    const user = localStorage.getItem("user")

    return(
      <BrowserRouter>
        <Routes>
            <Route path="/home" element={
                <PrivateRoute user={user}>
                    <Home />
                </PrivateRoute>
            }/>
            <Route path="/resposta" element={
                <PrivateRoute user={user}>
                    <Answer />
                </PrivateRoute>
            }/>
            <Route path="*" element={
                <PrivateRoute user={user}>
                    <Home />
                </PrivateRoute>
            }/>
            <Route exact path="/" element={<Authentication/>}  />
            <Route path="/respostacliente" element={<UserAnswer />}/>
        </Routes>
      </BrowserRouter>
    )
}
export default Router;
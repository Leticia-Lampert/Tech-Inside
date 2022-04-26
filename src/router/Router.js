import {
  BrowserRouter,
  Routes,
  Route,
  Navigate 
} from "react-router-dom";
import Home from "../pages/Home";
import Authentication from "../pages/Authentication"
import Answer from "../pages/Answer"
import UserAnswer from "../pages/UserAnswer"
import Feedback from "../pages/Feedback"
import { useState, useEffect } from "react";

const PrivateRoute = ({
  user,
  redirectPath = '/',
  children,
}) => {
  console.log('user', user, typeof user)
  console.log('user tst', !user)
  if (user == 'null') {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
}

function Router() {

  const [user, setUser] = useState(localStorage.getItem("user"))

  useEffect(() => {

    let newUser = localStorage.getItem("user")

    if(user != newUser) {
      setUser(localStorage.getItem("user"))
    }
  }, [user])

  return(
    <BrowserRouter>
      <Routes>
          <Route path="/home" element={
            <PrivateRoute user={user}>
              <Home />
            </PrivateRoute>
          } />
          <Route path="/respostacliente" element={
            <PrivateRoute user={user}>
              <UserAnswer />
            </PrivateRoute>
          } />
          <Route exact path="/" element={<Authentication/>}  />
          <Route exact path="/resposta" element={<Answer />}/>
          <Route exact path="/feedback" element={<Feedback />}/>
      </Routes>
    </BrowserRouter>
  )
}
export default Router;
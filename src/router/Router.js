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

const PrivateRoute = ({
    children,
  }) => {

    const user = localStorage.getItem("user")

    if (!user) {
      return <Navigate to="/" replace />;
    } else {
      return children;
    }
  }

function Router() {

    return(
      <BrowserRouter>
        <Routes>
            <Route path="/home" element={
                <PrivateRoute>
                    <Home />
                </PrivateRoute>
            }/>
            <Route path="/respostacliente" element={
                <PrivateRoute>
                    <UserAnswer />
                </PrivateRoute>
            }/>
            <Route path="*" element={
                <PrivateRoute>
                    <Home />
                </PrivateRoute>
            }/>
            <Route exact path="/" element={<Authentication/>}  />
            <Route path="/resposta" element={<Answer />}/>
            <Route path="/feedback" element={<Feedback />}/>
        </Routes>
      </BrowserRouter>
    )
}
export default Router;
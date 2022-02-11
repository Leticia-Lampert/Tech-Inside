import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from "../pages/Home";
import Authentication from "../pages/Authentication"

function Router() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/autenticacao" element={<Authentication/>}  />
                <Route path="/*" element={<div>testando</div>} />
            </Routes>
        </BrowserRouter>
    )
}
export default Router;
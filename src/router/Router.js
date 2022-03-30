import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from "../pages/Home";
import Authentication from "../pages/Authentication"
import Answer from "../pages/Answer"

function Router() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/autenticacao" element={<Authentication/>}  />
                <Route path="/resposta" element={<Answer />} />
                <Route path="/*" element={<div>Rota não encontrada</div>} />
            </Routes>
        </BrowserRouter>
    )
}
export default Router;
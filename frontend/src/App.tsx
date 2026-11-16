import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Home from "./pages/Home";
import Pennie from "./pages/Pennie";
import Pluis from "./pages/Pluis";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/penniepagina" element={<Pennie />} />
        <Route path="/pluizenpagina" element={<Pluis />} />
      </Routes>
    </Router>
  )
}

export default App;

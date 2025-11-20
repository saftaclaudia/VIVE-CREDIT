<<<<<<< HEAD
import { useLocation } from "react-router-dom";
=======
import { BrowserRouter } from "react-router-dom";
>>>>>>> d3567ae (Added risk dashboard components +filters)
import AppRoutes from "./routes/AppRoutes";

function App() {
  const location = useLocation();

  const showHeader = location.pathname === "/";

  return (
<<<<<<< HEAD
    <div>
      <AppRoutes />
    </div>
=======
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
>>>>>>> d3567ae (Added risk dashboard components +filters)
  );
}
export default App;

import GlobalStyles from "./styles/GlobalStyles";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Signup from "./ui/LoginSignup";
import TalentRoutes from "./ui/talent/TalentRoutes";
import CompanyRoutes from "./ui/company/CompanyRoutes";
import AdminRoutes from "./ui/admin/AdminRoutes";
function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes>
          {/* login and signup page */}
          <Route path="/" element={<Signup />} />
          {/* talent page */}
          ...{TalentRoutes}
          {/* company page */}
          ...{CompanyRoutes}
          {/* admin page */}
          ...{AdminRoutes}
        </Routes>
      </Router>
    </>
  );
}

export default App;

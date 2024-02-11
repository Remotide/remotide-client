import GlobalStyles from "./styles/GlobalStyles";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Signup from "./ui/LoginSignup";
import Jobs from "./ui/company/Jobs";
import JobsForm from "./ui/company/JobsForm";
import CompanyProfile from "./ui/company/Profile";
import DisplayApplicants from "./ui/company/DisplayApplicants";
import TalentProfile from "./ui/talent/Profile";
import LegalCompliance from "./ui/company/LegalCompliance";
function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/talent/profile" element={<TalentProfile />} />
          <Route path="/company/profile" element={<CompanyProfile />} />
          <Route path="company/legalCompliance" element={<LegalCompliance />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/postJobs" element={<JobsForm />} />
          <Route
            path="/company/displayApplicants/:id/:title"
            element={<DisplayApplicants />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;

import { Route } from "react-router-dom";
import CompanyProfile from "./Profile";
import LegalCompliance from "./LegalCompliance";
import Jobs from "./Jobs";
import JobForm from "./JobForm";
import DisplayTalent from "./DisplayTalent";
const CompanyRoutes = [
  <Route path="/company/profile" element={<CompanyProfile />} />,
  <Route path="company/legalCompliance" element={<LegalCompliance />} />,
  <Route path="/jobs" element={<Jobs />} />,
  <Route path="/postJob" element={<JobForm />} />,
  <Route
    path="/company/displayTalent/:id/:title"
    element={<DisplayTalent />}
  />,
];
export default CompanyRoutes;

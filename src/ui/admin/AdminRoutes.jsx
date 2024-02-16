import { Route } from "react-router-dom";
import VerifyPage from "./VerifyPage";
import Guides from "./Guides";
import GuideForm from "./GuideForm";
import ManageAdmins from "./ManageAdmins";
import Skills from "./Skills";
import Stats from "./Stats";
import UsersList from "./UsersList";
import Packages from "./Packages";
import PackageForm from "./PackageForm";
const AdminRoutes = [
  <Route path="/admin/verification" element={<VerifyPage />} />,
  <Route path="/admin/guides" element={<Guides />} />,
  <Route path="/admin/postGuide" element={<GuideForm />} />,
  <Route path="/admin/manageAdmins" element={<ManageAdmins />} />,
  <Route path="/admin/skills" element={<Skills />} />,
  <Route path="/admin/stats" element={<Stats />} />,
  <Route path="/admin/users" element={<UsersList />} />,
  <Route path="/admin/packages" element={<Packages />} />,
  <Route path="/admin/postPackage" element={<PackageForm />} />,
];
export default AdminRoutes;

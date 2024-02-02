import GlobalStyles from "./styles/GlobalStyles";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Button from "./ui/Button";
import Signup from "./ui/Signup";
import Profile from "./ui/Profile";
import Jobs from "./ui/Jobs";
import JobsForm from "./ui/JobsForm";
function App() {
  return (
    <>
      <GlobalStyles />
      {/* <div className="flex items-center justify-center">
        <h1 className="text-colorBrand500 text-center">Remotide</h1>
        <Button>Remotide</Button>
      </div>
      <Signup />
      <Profile /> */}
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/postJobs" element={<JobsForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

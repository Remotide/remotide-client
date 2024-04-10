import GlobalStyles from "./styles/GlobalStyles";
import { RouterProvider } from "react-router-dom";
import { router } from "./navigation/router";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster />
      <GlobalStyles />

      <RouterProvider router={router} />
    </>
  );
}

export default App;

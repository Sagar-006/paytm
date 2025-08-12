import { Routes, Route } from "react-router-dom";
import "./App.css";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import Send from "./pages/Send";
import { Toaster } from "react-hot-toast";
import { Auth } from "./pages/Auth";

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route element={<Auth />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<Auth/>}>
          <Route path="/send" element={<Send />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

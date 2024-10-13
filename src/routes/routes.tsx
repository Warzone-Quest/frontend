import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "@/App";
import Login from "@/pages/Login";
import SignUpForm from "@/pages/SignUpForm";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="login" element={<Login />}></Route>
      <Route path="signup" element={<SignUpForm />}></Route>
    </Route>,
  ),
);

export default router;

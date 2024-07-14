import { lazy, Suspense } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const Signup = lazy(() => import("./components/Signup"));
const Login = lazy(() => import("./components/Login"));
import { AppBar } from "./components/AppBar";
const Dashboard = lazy(() => import("./components/Dashboard"));

function App() {
  return (
    <div>
      <BrowserRouter>
        <AppBar />
        <Routes>
          <Route
            path="/signup"
            element={
              <Suspense fallback={"loading ..."}>
                <Signup />
              </Suspense>
            }
          />
          <Route
            path="/"
            element={
              <Suspense fallback={"loading ..."}>
                <Login />
              </Suspense>
            }
          />
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={"loading ..."}>
                <Dashboard />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

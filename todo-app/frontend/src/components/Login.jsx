import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { loginState } from "../atoms";
import axios from "axios";
import toastr from "toastr";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { activePageState } from "../atoms";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const setLoginState = useSetRecoilState(loginState);
  const navigate = useNavigate();
  const [activePage, setActivePage] = useRecoilState(activePageState);
  const navigateTo = (page) => {
    setActivePage(page);
    navigate(page);
  };

  const login = async () => {
    try {
      const response = await axios.post("http://localhost:4000/auth/login", {
        name,
        password,
      });
      if (response.status == 200) {
        console.log("login success");
        const token  = response.data.data;
        setLoginState({
          isLoggedIn: true,
          token,
          error: null,
        });
        toastr.success(response.data.message);
        navigateTo("/dashboard");
      } else {
        toastr.warning(response.error);
      }
    } catch (error) {
      console.error("Login failed:", error);
      setLoginState({
        isLoggedIn: false,
        user: null,
        error: "Login failed. Please check your credentials.",
      });
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Please enter user name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />{" "}
      <br />
      <input
        type="text"
        placeholder="Please enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />{" "}
      <br />
      <button onClick={login}>Login</button>
    </div>
  );
}

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

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/auth/login", {
        name,
        password,
      });
      if (response.status == 200) {
        console.log("login success");
        const token = response.data.data;
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
      <form className="max-w-sm mx-auto" onSubmit={login}>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            User Name
          </label>
          <input
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Please enter user name"
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              console.log(e.target.value);
            }}
          />{" "}
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            placeholder="Please enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />{" "}
        </div>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="submit"
        >
          Login
        </button>
      </form>
      {/*       <input
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
      <button onClick={login}>Login</button> */}
    </div>
  );
}

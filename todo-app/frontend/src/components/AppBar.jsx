import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { activePageState } from "../atoms";

export function AppBar() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useRecoilState(activePageState);

  const navigateTo = (page) => {
    setActivePage(page);
    navigate(page);
  };
  return (
    <div>
      <div>
        {activePage === "/" && (
          <button
            onClick={() => {
              navigateTo("/signup");
            }}
          >
            Signup
          </button>
        )}
        {activePage === "/signup" && (
          <button
            onClick={() => {
              navigateTo("/");
            }}
          >
            Login
          </button>
        )}
        {activePage === "/dashboard" && (
          <button
            onClick={() => {
              navigateTo("/");
            }}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

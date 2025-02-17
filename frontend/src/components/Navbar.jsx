import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme"));
  const [input, setInput] = useState("");
  const inputRef = useRef();
  useEffect(() => {
    if (theme === "light") {
      inputRef.current.checked = false;
    } else {
      inputRef.current.checked = true;
    }
  }, [theme]);
  const handleTheme = () => {
    if (theme === "light") {
      localStorage.setItem("theme", "cyberpunk");
    } else {
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className="navbar bg-base-100 absolute">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/">Homepage</Link>
            </li>
            <li>
              <Link to="/matches">Matches</Link>
            </li>
            <li>
              <Link to="/logout">logout</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl">Uno Calculator</a>
      </div>
      <div className="navbar-end">
        <input
          type="checkbox"
          value="cyberpunk"
          ref={inputRef}
          onClick={handleTheme}
          onChange={() => null}
          className="toggle theme-controller col-span-2 col-start-1 row-start-1 border-sky-400 bg-amber-300 [--tglbg:theme(colors.sky.500)] checked:border-blue-800 checked:bg-blue-300 checked:[--tglbg:theme(colors.blue.900)]"
        />
      </div>
    </div>
  );
};

export default Navbar;

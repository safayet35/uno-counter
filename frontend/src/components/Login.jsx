import { Link } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import axiosInstance from "../api/axiosInstance.js";
import { useAuth } from "../context/AuthContext.jsx";
const Login = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { setTokenInLs, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // ✅ Show toast message when message state changes
  useEffect(() => {
    if (message) {
      toast.success(message);
    }
  }, [message]);
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated]);
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // ✅ Memoized function to prevent re-renders
  const handleData = useCallback(e => {
    setUserData(prevData => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  }, []);

  const handleSubmitData = async e => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const { data } = await axiosInstance.post("/user/login", userData, {
        withCredentials: true
      });

      setTokenInLs(data.data.token);
      setMessage(data.message);
      setTimeout(() => {
        navigate("/"); // Navigate after 2 seconds
      }, 1000);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Something went wrong");
      } else if (err.request) {
        setError("No response from server");
      } else {
        setError("Request error");
      }
    }
  };

  return (
    <div className="bg-base-200 h-screen w-full flex items-center justify-center">
      <ToastContainer />
      <form
        onSubmit={handleSubmitData}
        className="px-4 py-8 bg-white rounded-3xl"
      >
        <h2 className="text-center text-3xl font-semibold">Login</h2>

        <div className="my-3 flex flex-col gap-1">
          <label className="text-[14px]" htmlFor="email">
            Email
          </label>
          <input
            className="input-bordered input w-full px-2 py-2 outline-none rounded-2xl"
            type="email"
            placeholder="Email"
            name="email"
            required
            value={userData.email}
            onChange={handleData}
          />
        </div>

        <div className="my-3 flex flex-col gap-1">
          <label className="text-[14px]" htmlFor="password">
            Password
          </label>
          <input
            className="input-bordered input text-black w-full px-2 py-2 outline-none rounded-2xl"
            type="password"
            placeholder="Password"
            name="password"
            required
            value={userData.password}
            onChange={handleData}
          />
        </div>

        <button
          className="bg-secondary text-white text-center w-full my-3 border-2 border-white py-2 rounded-2xl"
          type="submit"
        >
          Login
        </button>

        <div className="text-[10px] flex gap-1">
          <p>Don't have an account?</p>
          <Link className="underline text-secondary" to="/signup">
            Signup
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;

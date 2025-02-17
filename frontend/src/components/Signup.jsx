import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axiosInstance from "../api/axiosInstance.js";
import { useAuth } from "../context/AuthContext.jsx";
const Signup = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    fullName: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { setTokenInLs, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (message) {
      toast.success(message);
    }
  }, [message]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleData = e => {
    const value = e.target.value;
    const name = e.target.name;

    setUserData(prevData => {
      return { ...prevData, [name]: value };
    });
  };

  const handleSubmitData = async e => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const { data } = await axiosInstance.post("/user/register", userData, {
        withCredentials: true
      });

      setUserData({
        email: "",
        password: "",
        fullName: ""
      });
      setMessage(data.message);
      setTimeout(() => {
      navigate("/login"); // Navigate after 2 seconds
    }, 2000);
      
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
    <div className="flex items-center justify-center w-full h-screen bg-base-200">
      <ToastContainer />
      <form
        onSubmit={e => handleSubmitData(e)}
        className="px-6 py-6 bg-white rounded-3xl"
      >
        <h2 className="text-center text-3xl font-semibold">Sign up</h2>
        <div className="my-3 flex flex-col gap-[1px] justify-center">
          <label className="text-[14px]" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            className="input-bordered input w-full px-2 py-2 outline-none rounded-2xl"
            type="name"
            placeholder="Name"
            name="fullName"
            required
            value={userData.fullName}
            onChange={e => handleData(e)}
          />
        </div>

        <div className="my-3 flex flex-col gap-[1px] justify-center">
          <label className="text-[14px]" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            className="input-bordered input text-black w-full px-2 py-2 outline-none rounded-2xl "
            type="Email"
            required
            placeholder="Email"
            name="email"
            value={userData.email}
            onChange={e => handleData(e)}
          />
        </div>
        <div className="my-3 flex flex-col gap-[1px] justify-center">
          <label className="text-[14px]" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            className="input-bordered input text-black w-full px-2 py-2 outline-none rounded-2xl "
            type="password"
            required
            placeholder="Password"
            name="password"
            value={userData.password}
            onChange={e => handleData(e)}
          />
        </div>
        <button
          className="bg-secondary text-white text-center w-full my-3 border-2 border-white py-2 rounded-2xl"
          type="submit"
        >
          Sign up
        </button>
        <div className="text-[10px] flex gap-1">
          <p>Already have an account?</p>
          <Link className="underline text-secondary" to="/login">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;

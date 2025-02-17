import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import AppLayout from "./layout/AppLayout.jsx";
import Table from "./components/Table.jsx";
import Matches from "./components/Matches.jsx";
import ProtectedPage from "./components/ProtectedPages.jsx";
import ErrorPage from "./components/ErrorPage.jsx"
import Logout from "./components/Logout.jsx";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: (
            <ProtectedPage>
              <Home />
            </ProtectedPage>
          )
        },
        {
          path: "/matches",
          element: (
            <ProtectedPage>
              <Matches />
            </ProtectedPage>
          )
        }
      ]
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/signup",
      element: <Signup />
    },
    {
      path: "/table",
      element: (
        <ProtectedPage>
          <Table />
        </ProtectedPage>
      )
    },
    {
      path: "/logout",
      element: <Logout />
    },
    {
      path: "*",
      element: <ErrorPage />
    }
  ]);

  return (
    <div className="">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;

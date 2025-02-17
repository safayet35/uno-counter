import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="w-full h-screen flex flex-col gap-2 items-center justify-center">
      <h2 className="text-6xl font-bold">404 Error</h2>
      <p>page not found</p>
      <Link to="/" className="mt-5 btn btn-error py-2">Go Home</Link>
    </div>
  );
};

export default ErrorPage;

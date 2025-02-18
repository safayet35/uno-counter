import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance.js";
import MatchTable from "./MatchTable.jsx";

const Matches = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch player data from API

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axiosInstance.get("/get-roundes"); // Replace with actual API URL

        const data = response.data.data.roundes;
        
        setData(data);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching players:", err);

        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  // Update match score

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <span className=" loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  const itemsPerPage = 5;
  const totalItems = data.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);
  const reversedData = data
    .slice()
    .reverse()
    .slice(startIndex, startIndex + itemsPerPage);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="py-20 h-screen w-full">
      
      {data.length >= 1 ? (
        reversedData.map((roundes, index) => (
          <MatchTable
            date={roundes.createdAt}
            key={roundes._id}
            matches={roundes.matches}
            index={totalItems - (startIndex + index)}
          />
        ))
      ) : (
        <div className="h-full w-full flex items-center justify-center">
          <h1 className="text-2xl">No roundes found</h1>
        </div>
      )}
      {data.length >= 1 ? (
        <div className="flex gap-2 mt-4 w-full items-center justify-center">
          <button
            className="px-3 py-1 bg-red-300 rounded"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </button>

          <span className="px-3 py-1 bg-gray-100 rounded">
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="px-3 py-1 bg-green-300 rounded"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Matches;

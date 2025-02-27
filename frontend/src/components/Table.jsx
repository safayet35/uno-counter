import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axiosInstance from "../api/axiosInstance.js";
import { useAuth } from "../context/AuthContext.jsx";
const ScoreTable = () => {
  const [players, setPlayers] = useState([]);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [showSave, setShowSave] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showSubmit, setShowSubmit] = useState(false);
  const { setTokenInLs, isAuthenticated } = useAuth();
  const [localPlayersInfo, setLocalPlayersInfo] = useState(
    () => JSON.parse(localStorage.getItem("localInfo")) || []
  );
  const [localArray, setLocalArray] = useState(() => localPlayersInfo || []);

  // useEffect(() => {
  //     const data = localStorage.getItem("localInfo");
  //     setLocalPlayersInfo(JSON.parse(data));
  //   }, []);
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
  const isLocalInfoHas = localPlayersInfo.length > 0;
  // Add a new player
  const handleAddPlayer = () => {
    if (newPlayerName.trim() === "") return;
    setPlayers([
      ...players,
      {
        id: Date.now(),
        name: newPlayerName,
        scores: Array(6).fill(0), // 6 match fields initialized to 0
        total: Number(0)
      }
    ]);

    setNewPlayerName("");
  };

  // Update match score
  const handleUpdateScore = (playerId, matchIndex, value) => {
    isLocalInfoHas
      ? setLocalArray(prev =>
          prev.map(player => {
            if (player.id === playerId) {
              const updatedMatches = [...player.scores];
              updatedMatches[matchIndex] = value === "" ? 0 : Number(value);
              return {
                ...player,
                scores: updatedMatches,
                total: updatedMatches.reduce((acc, curr) => acc + curr, 0)
              };
            }
            return player;
          })
        )
      : setPlayers(prev =>
          prev.map(player => {
            if (player.id === playerId) {
              const updatedMatches = [...player.scores];
              updatedMatches[matchIndex] = value === "" ? 0 : Number(value);
              return {
                ...player,
                scores: updatedMatches,
                total: updatedMatches.reduce((acc, curr) => acc + curr, 0)
              };
            }
            return player;
          })
        );
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      const { data } = await axiosInstance.post(
        "/create-round",
        { players: localPlayersInfo },
        {
          withCredentials: true
        }
      );

      setMessage(data.message);

      localStorage.removeItem("localInfo");
    } catch (err) {
      console.log(err);
      setLoading(false);
      if (err.response) {
        setError(err.response.data.message || "Something went wrong");
      } else if (err.request) {
        setError("No response from server");
      } else {
        setError("Request error");
      }
    }
    setPlayers([]);
  };

  useEffect(() => {
    setShowSubmit(checkLastInput());
  }, [showSubmit]);

  const checkLastInput = () => {
    return localPlayersInfo.some(val => {
      return val.scores[5] > 0;
    });
  };

  const handleLocalStorage = () => {
    const data = isLocalInfoHas ? [...localArray] : players;
    localStorage.setItem("localInfo", JSON.stringify(data));
  };
  
  return (
    <div className="container mx-auto p-4 text-[10px]">
      <ToastContainer />
      <h2 className="text-lg font-bold mb-4">Match Score Table</h2>

      {/* Add Player Section */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={newPlayerName}
          onChange={e => setNewPlayerName(e.target.value)}
          placeholder="Enter player name"
          className="outline-1 outline-green-500 border p-2 rounded"
        />
        <button
          onClick={handleAddPlayer}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Player
        </button>
      </div>

      {/* Table */}
      <form onSubmit={handleSubmit} className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Name</th>
              {[...Array(6)].map((_, index) => (
                <th key={index} className="text-[10px] p-1 border">
                  M {index + 1}
                </th>
              ))}
              <th className="p-1 border text-[10px]">Total</th>
            </tr>
          </thead>
          <tbody className="">
            {isLocalInfoHas
              ? localArray.map(player => (
                  <tr key={player.id} className="text-center">
                    <td className="p-1 border">{player.name}</td>
                    {player.scores.map((score, matchIndex) => (
                      <td key={matchIndex} className="p-1 border">
                        <input
                          type="number"
                          value={score === 0 ? "" : score}
                          onChange={e =>
                            handleUpdateScore(
                              player.id,
                              matchIndex,
                              e.target.value
                            )
                          }
                          className="outline-1 outline-green-500 w-7 border p-1"
                        />
                      </td>
                    ))}
                    <td className="p-2 border font-bold">{player.total}</td>
                  </tr>
                ))
              : players.map(player => (
                  <tr key={player.id} className="text-center">
                    <td className="p-1 border">{player.name}</td>
                    {player.scores.map((score, matchIndex) => (
                      <td key={matchIndex} className="p-1 border">
                        <input
                          type="number"
                          value={score === 0 ? "" : score}
                          onChange={e =>
                            handleUpdateScore(
                              player.id,
                              matchIndex,
                              e.target.value
                            )
                          }
                          className="outline-1 outline-green-500 w-7 border p-1"
                        />
                      </td>
                    ))}
                    <td className="p-2 border font-bold">{player.total}</td>
                  </tr>
                ))}
          </tbody>
        </table>
        {
          <div className="flex gap-4">
            {showSubmit ? (
              <button
                className="my-4 bg-green-500 text-white px-4 py-2 rounded"
                type="submit"
              >
                Submit
              </button>
            ) : null}
            {showSave ? (
              <div
                onClick={handleLocalStorage}
                className="my-4 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </div>
            ) : null}
          </div>
        }
      </form>
    </div>
  );
};

export default ScoreTable;

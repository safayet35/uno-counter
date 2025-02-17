import axiosInstance from "./axiosInstance.js";
export const checkAuth = async () => {
 try {
    const response = await axiosInstance.get("/user/auth-check", {
      credentials: "include" // Ensures cookies are sent
    });
// 
    return response.data.success;
 } catch (error) {
    return false;
 }
};

// import { useState, useEffect } from "react";
// import axiosInstance from "../api/axiosInstance.js";

// const Matches = () => {
//  const [players, setPlayers] = useState([]);
//  const [loading, setLoading] = useState(true);

//  // Fetch player data from API
//  useEffect(() => {
//     const fetchPlayers = async () => {
//       try {
//        const response = await axiosInstance.get("/get-roundes"); // Replace with actual API URL

//        const data = response.data.data.roundes[0].matches;

//        const formattedPlayers = data.map(player => ({
//           id: player.id,
//           name: player.name,
//           scores: player.scores,
//           //Array(6).fill(0), // Default match scores to 0
//           total: player.total
//        }));

//        setPlayers(formattedPlayers);
//        console.log(formattedPlayers);
//        setLoading(false);
//       } catch (error) {
//        console.error("Error fetching players:", error);
//        setLoading(false);
//       }
//     };

//     fetchPlayers();
//  }, []);

//  // Update match score
//  const handleUpdateScore = (playerId, matchIndex, value) => {
//     setPlayers(prev =>
//       prev.map(player => {
//        if (player.id === playerId) {
//           const updatedMatches = [...player.scores];

//           // If value is empty, reset to 0
//           updatedMatches[matchIndex] = value === "" ? 0 : Number(value);

//           return {
//             ...player,
//             scores: updatedMatches,
//             total: updatedMatches.reduce((acc, curr) => acc + curr, 0)
//           };
//        }
//        return player;
//       })
//     );
//  };

//  if (loading) {
//     return (
//       <div className="h-screen w-full flex items-center justify-center">
//        <span className="loading loading-spinner loading-lg"></span>
//       </div>
//     );
//  }

//  // Sort players by total score (lowest score wins)
//  const sortedPlayers = [...players].sort((a, b) => a.total - b.total);

//  // Assign rankings
//  const getEmoji = index => {
//     if (index === 0) return "🏆"; // Champion (Lowest Score)
//     if (index === 1) return "🥈"; // Runner-up
//     if (index === 2) return "🥉"; // Third Place
//     if (index === sortedPlayers.length - 1) return "😢"; // Last Place (Highest Score)
//     return "😐"; // Neutral
//  };

//  // Color-coded rows based on rank
//  const getRowColor = index => {
//     if (index === 0) return "bg-green-300"; // Champion
//     if (index === 1 || index === 2) return "bg-green-100"; // 2nd & 3rd Place
//     if (index === sortedPlayers.length - 1) return "bg-red-300"; // Last Place
//     return "bg-white"; // Middle Players
//  };

//  return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-lg font-bold mb-4">Match Score Table 🏆</h2>

//       <div className="overflow-x-auto">
//        <table className="min-w-full bg-white border border-gray-300">
//           <thead>
//             <tr className="bg-gray-200 text-[8px]">
//              <th className="p-1 border">Rank</th>
//              <th className="p-1 border">Name</th>
//              {[...Array(6)].map((_, index) => (
//                 <th key={index} className="p-1 border">
//                   M {index + 1}
//                 </th>
//              ))}
//              <th className="p-2 border">Total Score</th>
//             </tr>
//           </thead>
//           <tbody>
//             {sortedPlayers.map((player, index) => (
//              <tr
//                 key={player.id}
//                 className={`text-center ${getRowColor(index)}`}
//              >
//                 <td className="p-2 border font-bold">{index + 1}</td>
//                 <td className="p-2 text-[11px] border">
//                   {player.name} {getEmoji(index)}
//                 </td>
//                 {player.scores.map((score, matchIndex) => (
//                   <td key={matchIndex} className="p-1 border">
//                    <input
//                       type="number"
//                       disabled={true}
//                       value={score === 0 ? "" : score}
//                       onChange={e =>
//                         handleUpdateScore(player.id, matchIndex, e.target.value)
//                       }
//                       className="w-7 border p-1 text-center"
//                    />
//                   </td>
//                 ))}
//                 <td className="p-2 border font-bold">{player.total}</td>
//              </tr>
//             ))}
//           </tbody>
//        </table>
//       </div>
//     </div>
//  );
// };

// export default Matches;

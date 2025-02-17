// const createRound = asyncHandler(async (req, res) => {
//   const email = req.user.email;
// 
//   const user = await User.findOne({ email })
//     .select("-password")
//     .populate("roundes", "matches");
// 
//   if (!user) {
//     throw new ApiError(401, "You are not authorized ");
//   }
//   const round = await Round.create({});
// 
//   await user.roundes.push(round._id);
//   await user.save();
// 
//   return res.status(200).json(new ApiResponse(200, round, "Round created"));
// });
// 
// const createMatch = asyncHandler(async (req, res) => {
//   const players = req.body.players;
//   const roundId = req.params.roundId;
// 
//   if (!roundId) {
//     throw new ApiError(400, "Match create failed please create round first");
//   }
// 
//   if (!Array.isArray(players)) {
//     throw new ApiError(400, "Player data is not correct");
//   }
// 
//   for (const player of players) {
//     if (!player.name || !player.score) {
//       throw new ApiError(400, "Each player must have name and score");
//     }
//   }
// 
//   const savedPlayers = await Player.insertMany(players);
// 
//   const getPlayersId = [];
// 
//   savedPlayers.forEach(value => {
//     getPlayersId.push(value._id);
//   });
// 
//   const createMatch = await Match.create({});
// 
//   await createMatch.players.push(...getPlayersId);
//   createMatch.save();
// 
//   const round = await Round.findById(roundId);
// 
//   if (!round) {
//     throw new ApiError(400, "Invalid request ");
//   }
// 
//   await round.matches.push(createMatch);
//   await round.save();
// 
//   return res.status(200).json(
//     new ApiResponse(
//       200,
//       {
//         data: await round.populate({
//           path: "matches",
//           populate: {
//             path: "players",
//             model: "Player"
//           }
//         })
//       },
//       "Match added successfully"
//     )
//   );
// });
import User from "../models/user.model.js";
import Round from "../models/round.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const createMatchRound = asyncHandler(async (req, res) => {
  const matches = req.body.players;

  if (!Array.isArray(matches)) {
    throw new ApiError(400, "Player data is not correct");
  }

  for (const player of matches) {
    if (!player.name || !player.total || !player.scores) {
      throw new ApiError(
        400,
        "Each player must have name , score and total value"
      );
    }
  }
  const round = await Round.create({
    matches
  });
  const user = await User.findById(req.user._id);
  await user.roundes.push(round._id);
  await user.save();
  return res
    .status(200)
    .json(new ApiResponse(200, round, "Match created successfully"));
});

const getRoundes = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select(
    "-password -fullName -email -profileImage"
  );

  const roundes = await user.populate("roundes");
  return res
    .status(200)
    .json(new ApiResponse(200, roundes, "All match roundes"));
});

export { createMatchRound, getRoundes };

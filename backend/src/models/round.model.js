import mongoose from "mongoose";

const roundSchema = mongoose.Schema(
  {
    matches: {
       type:Array,
       required: true
    }
  },
  { timestamps: true }
);

const Round = mongoose.model("Round", roundSchema);

export default Round;

import express from "express";
import { getAllProjectForTimeTracking } from "../controller/projectController.js";
import { getAllTypology } from "../controller/typologyController.js";
import { getTimeTrackingByUserId, createTimetracking, updateTimetracking, deleteTimetracking } from "../controller/timetrackingController.js";

const userRouter = express.Router();

userRouter.get("/projects", getAllProjectForTimeTracking);
userRouter.get("/typologys", getAllTypology);
userRouter.get("/timeTrakings", getTimeTrackingByUserId);

userRouter.post("/timeTrackings", createTimetracking);
userRouter.put("/timeTrackings/:id", updateTimetracking);
userRouter.delete("/timeTrackings/:id", deleteTimetracking);

export default userRouter;
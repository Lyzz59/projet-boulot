import express from "express";
import { registration, getAllUsers, updateUser, deleteOne } from "../controller/userController.js";
import { getAllRoles } from "../controller/roleController.js";
import { createClient, updateClient, getAllClients, deleteClient } from "../controller/clientController.js";
import { updateProject, createProject, getAllProjectForGestionAdmin, deleteProject, getAllActiveProject } from "../controller/projectController.js";
import { getAllTimeTracking } from "../controller/timetrackingController.js";

const adminRouter = express.Router();

adminRouter.post("/registration", registration);
adminRouter.get("/users", getAllUsers);
adminRouter.put("/users/:userId", updateUser);
adminRouter.delete("/users/:userId", deleteOne);
adminRouter.get("/roles", getAllRoles);

adminRouter.post("/clients", createClient);
adminRouter.put("/clients/:clientId", updateClient);
adminRouter.delete("/clients/:clientId", deleteClient);
adminRouter.get("/clients", getAllClients);

adminRouter.get("/projects", getAllProjectForGestionAdmin);
adminRouter.get("/projects/active", getAllActiveProject);
adminRouter.put("/projects/:projectId", updateProject);
adminRouter.post("/projects", createProject);
adminRouter.delete("/projects/:projectId", deleteProject);

adminRouter.get("/timeTrackings/:weekNumber", getAllTimeTracking);


export default adminRouter;
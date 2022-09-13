import Project from "../model/Project.js";

export async function createProject(req, res) {
    const data = req.body;
    try {
        const newProject = new Project(data);
        await newProject.save();
        res.status(201).end()
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
}

export async function getAllProjectForTimeTracking(req, res) {
    try {
        const projects = await Project.getAllForTimeTracking();
        res.status(200).json(projects);
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
}

export async function getAllProjectForGestionAdmin(req, res) {
    try {
        const projects = await Project.getAllForGestionAdmin();
        res.status(200).json(projects);
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
}

export async function getAllActiveProject(req, res) {
    try {
        const projects = await Project.getAllActive();
        res.status(200).json(projects);
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
}

export async function updateProject(req, res) {
    const projectId = Number(req.params.projectId);
    const data = req.body;

    try {
        const project = new Project(data);
        await project.update(projectId);
        res.status(200).end();
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
}

export async function deleteProject(req, res) {
    const projectId = Number(req.params.projectId);

    try {
        await Project.deleteOne(projectId)
        res.status(200).end();
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
}
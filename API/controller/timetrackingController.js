import TimeTracking from "../model/TimeTracking.js";

export async function createTimetracking(req, res) {
    const data = req.body;
    data.userId = res.locals.user.id;

    try {
        const newTimetracking = new TimeTracking(data);
        await newTimetracking.save();
        res.status(201).end();
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
}
export async function getAllTimeTracking(req, res) {
    const weekNumber = Number(req.params.weekNumber);
    try {
        const timeTrackings = await TimeTracking.getAll(weekNumber);
        res.status(200).json(timeTrackings);
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
}
export async function updateTimetracking(req, res) {
    const data = req.body;
    const id = Number(req.params.id);
    console.log(id, data);
    try {
        const timeTracking = new TimeTracking(data);
        await timeTracking.update(id);
        res.status(200).end();
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
}

export async function getTimeTrackingByUserId(req, res) {
    const userId = res.locals.user.id;
    const createdAt = req.query.fromDate;
    try {
        const timeTrackings = await TimeTracking.getByUserId(userId, createdAt);
        res.status(200).json(timeTrackings);
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
}

export async function deleteTimetracking(req, res) {
    const timeTrackingId = Number(req.params.id);
    try {
        await TimeTracking.deleteOne(timeTrackingId)
        res.status(200).end();
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
}
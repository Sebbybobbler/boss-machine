const express = require("express");
const apiRouter = express.Router();
const {
    getAllFromDatabase,
    addToDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    createMeeting,
    deleteAllFromDatabase,
} = require("./db.js");

// Minions
apiRouter.get("/minions", (req, res, next) => {
    res.status(200).send(getAllFromDatabase("minions"));
});

apiRouter.get("/minions/:minionId", (req, res, next) => {
    minionId = req.params.minionId;
    getMinion = getFromDatabaseById("minions", minionId);
    if (getMinion) {
        res.send(getMinion);
    } else {
        res.status(404).send("ID not found");
    }
});

apiRouter.post("/minions", (req, res, next) => {
    const newMinion = req.body;
    if (newMinion.name && newMinion.title && newMinion.salary) {
        res.send(
            addToDatabase("minions", {
                name: newMinion.name,
                title: newMinion.title,
                salary: newMinion.salary,
            })
        );
    } else {
        res.status(400).send("Incorrect format to add new minion");
    }
});

apiRouter.put("/minions/:minionId", (req, res, next) => {
    const minionId = req.params.minionId;
    const updatedMinion = req.body;
    const getMinion = getFromDatabaseById("minions", minionId);
    if (getMinion) {
        res.status(200).send(
            updateInstanceInDatabase("minions", {
                id: minionId,
                name: updatedMinion.name,
                title: updatedMinion.title,
                salary: updatedMinion.salary,
            })
        );
    } else {
        res.status(400).send("ID Not found");
    }
});

apiRouter.delete("/minions/:minionId", (req, res, next) => {
    const minionId = req.params.minionId;
    const deleteMinion = deleteFromDatabasebyId("minions", minionId);
    if (deleteMinion) {
        res.send(`Minion Deleted`);
    } else {
        res.status(400).send("ID not found");
    }
});

//ideas
apiRouter.use("/ideas/:ideaId", (req, res, next) => {
    const ideaId = req.params.ideaId;
    const ideaExists = getFromDatabaseById("ideas", ideaId);
    if (ideaExists) {
        next();
    } else {
        return res.status(400).send("ID not found");
    }
});
apiRouter.post("/ideas", (req, res, next) => {
    const newIdea = req.body;
    if (
        newIdea.name &&
        newIdea.description &&
        newIdea.numWeeks &&
        newIdea.weeklyRevenue
    ) {
        next();
    } else {
        return res.status(400).send("Incorrect Format");
    }
});

apiRouter.put("/ideas/:ideaId", (req, res, next) => {
    const newIdea = req.body;
    if (
        newIdea.name &&
        newIdea.description &&
        newIdea.numWeeks &&
        newIdea.weeklyRevenue
    ) {
        next();
    } else {
        return res.status(400).send("Incorrect Format");
    }
});

apiRouter.get("/ideas", (req, res, next) => {
    res.send(getAllFromDatabase("ideas"));
});

apiRouter.post("/ideas", (req, res, next) => {
    const newIdea = req.body;
    res.send(
        addToDatabase("ideas", {
            name: newIdea.name,
            description: newIdea.description,
            numWeeks: newIdea.numWeeks,
            weeklyRevenue: newIdea.weeklyRevenue,
        })
    );
});

apiRouter.get("/ideas/:ideaId", (req, res, next) => {
    const ideaId = req.params.ideaId;
    res.send(getFromDatabaseById("ideas", ideaId));
});

apiRouter.put("/ideas/:ideaId", (req, res, next) => {
    const ideaId = req.params.id;
    const newIdea = req.body;
    res.send(
        updateInstanceInDatabase("ideas", {
            id: ideaId,
            name: newIdea.name,
            description: newIdea.description,
            numWeeks: newIdea.numWeeks,
            weeklyRevenue: newIdea.weeklyRevenue,
        })
    );
});

apiRouter.delete("/ideas/:ideaId", (req, res, next) => {
    const ideaId = req.params.ideaId;
    const idea = req.body;
    deleteFromDatabasebyId("ideas", ideaId);
    res.send(`Idea Deleted`);
});

// Meetings

apiRouter.get("/meetings", (req, res, next) => {
    res.send(getAllFromDatabase("meetings"));
});

apiRouter.post("/meetings", (req, res, next) => {
    res.send(addToDatabase("meetings", createMeeting()));
});

apiRouter.delete("/meetings", (req, res, next) => {
    deleteAllFromDatabase("meetings")
    res.send("All meetings deleted")
});

module.exports = apiRouter;

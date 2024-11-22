import * as modulesDao from "./dao.js";

export default function ModuleRoutes(app) {
    //4.5.3
    app.delete("/api/modules/:moduleId", (req, res) => {
        const { moduleId } = req.params;
        const status = modulesDao.deleteModule(moduleId); //FIXME: had to remove await keyword
        res.send(status);
    });

    //4.5.4
    app.put("/api/modules/:moduleId", (req, res) => {
        const { moduleId } = req.params;
        const moduleUpdates = req.body;
        const status = modulesDao.updateModule(moduleId, moduleUpdates); //FIXME: had to remove await keyword
        res.send(status);
    });
}



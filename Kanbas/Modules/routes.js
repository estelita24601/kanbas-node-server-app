import * as modulesDao from "./dao.js";

export default function ModuleRoutes(app) {
    //delete module
    app.delete("/api/modules/:moduleId", async (req, res) => {
        const { moduleId } = req.params;
        console.log(`MODULES DAO - trying to delete module ${JSON.stringify(moduleId)}`)
        const result = await modulesDao.deleteModule(moduleId);

        if (result.acknowledged) {
            const n = result.deletedCount;
            if (n > 0) {
                res.status(200).send(`deleted ${n} modules`);
            } else {
                res.status(404);
            }
        } else {
            res.status(500);
        }
    });

    //update module
    app.put("/api/modules/:moduleId", async (req, res) => {
        const { moduleId } = req.params;
        const moduleUpdates = req.body;
        const result = await modulesDao.updateModule(moduleId, moduleUpdates);
        if (result.acknowledged) {
            res.status(200).send(`modified ${result.modifiedCount} modules`);
        } else {
            res.status(500);
        }
    });
}

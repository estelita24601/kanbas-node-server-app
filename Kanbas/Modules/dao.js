import Database from "../Database/index.js";

//4.5.1
//get all the modules from the database, then filter them based on the given course ID
export function findModulesForCourse(courseId) {
    const { modules } = Database;
    console.log(`Modules DAO - filtering modules ${courseId}`)
    return modules.filter((module) => {
        const include_module = module.course === courseId;
        console.log(`\t${include_module}: module.course = ${module.course}`);

        return include_module;
    });
}

//4.5.2
//create new module and add to the database, then return it
export function createModule(module) {
    const newModule = { ...module, _id: Date.now().toString() };
    Database.modules = [...Database.modules, newModule];
    return newModule;
}

//4.5.3
export function deleteModule(moduleId) {
    const { modules } = Database;
    Database.modules = modules.filter((module) => module._id !== moduleId);
}

//4.5.4
export function updateModule(moduleId, moduleUpdates) {
    const { modules } = Database;
    const module = modules.find((module) => module._id === moduleId);
    Object.assign(module, moduleUpdates);
    return module;
}

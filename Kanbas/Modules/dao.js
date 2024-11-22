import Database from "../Database/index.js";

//4.5.1
//get all the modules from the database, then filter them based on the given course ID
export function findModulesForCourse(courseId) {
    const { modules } = Database;
    return modules.filter((module) => module.course === courseId);
}

//4.5.2
//create new module and add to the database, then return it
export function createModule(module) {
    const newModule = { ...module, _id: Date.now().toString() };
    Database.modules = [...Database.modules, newModule];
    return newModule;
}

import model from "./model.js";

//get all the modules from the database, then filter them based on the given course ID
export function findModulesForCourse(courseId) {
    return model.find({ course: courseId });
}

//create new module and add to the database, then return it
export function createModule(module) {
    return model.create(module);
}

export function deleteModule(moduleId) {
    return model.deleteOne({ _id: moduleId });
}

export function updateModule(moduleId, moduleUpdates) {
    return model.updateOne({ _id: moduleId }, { $set: moduleUpdates });
}

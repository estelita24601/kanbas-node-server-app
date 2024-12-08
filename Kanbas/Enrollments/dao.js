import model from "./model.js";

export async function findCoursesForUser(userId) {
    const enrollments = await model.find({ user: userId }).populate("course");
    return enrollments.map((enrollment) => enrollment.course);
}
export async function findUsersForCourse(courseId) {
    const enrollments = await model.find({ course: courseId }).populate("user");
    return enrollments.map((enrollment) => enrollment.user);
}

export function enrollUserInCourse(user, course) {
    console.log(`DAO - enrollUserInCourse`);
    return model.create({ user, course });
}
export function unenrollUserFromCourse(user, course) {
    console.log(`DAO - unenrollUserFromCourse`);
    return model.deleteOne({ user, course });
}

export function removeEnrollment(userId, courseId) {
    console.log(`\tDAO - removeEnrollment\n\tuser = ${JSON.stringify(userId)}\n\tcourse = ${JSON.stringify(courseId)}`);
    return model.deleteOne({ user: userId, course: courseId });
}

export function getUserEnrollments(userId) {
    console.log(`\tDAO - getUserEnrollments ${JSON.stringify(userId)}`);
    return model.find({ user: userId });
}
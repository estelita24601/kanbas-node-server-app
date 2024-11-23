import Database from "../Database/index.js";
// {
//     "_id": "1",
//     "user": "123",
//     "course": "RS101"
//   },


export function enrollUserInCourse(userId, courseId) {
    const { enrollments } = Database;
    enrollments.push({ _id: Date.now(), user: userId, course: courseId });
}

export function unenrollUserFromCourse(userId, courseId) {
    const { enrollments } = Database;

    const enrollmentIndex = enrollments.findIndex((enrollment) => enrollment.user === userId && enrollment.course === courseId);

    if (enrollmentIndex !== -1) {
        enrollments.splice(enrollmentIndex, 1);
    }

    return enrollmentIndex;
}

export function getUserEnrollments(userId) {
    console.log(`get enrollments for user ${userId}`);
    return Database.enrollments.filter((enrollment) => enrollment.user === userId);
}
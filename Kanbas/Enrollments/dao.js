import Database from "../Database/index.js";
// {
//     "_id": "1",
//     "user": "123",
//     "course": "RS101"
//   },

//NOTE: this is working
export function enrollUserInCourse(userId, courseId) {
    console.log(`\tDAO - add user ${userId} to course ${courseId}`)
    const initSize = Database.enrollments.length;

    Database.enrollments.push({ _id: Date.now().toString(), user: userId, course: courseId });

    return initSize - Database.enrollments.length;
}

export function unenrollUserFromCourse(userId, courseId) {
    console.log(`\tDAO - remove user ${userId} from course ${courseId}`);
    const { enrollments } = Database;

    const enrollmentIndex = enrollments.findIndex((enrollment) => enrollment.user === userId && enrollment.course === courseId)
    if (enrollmentIndex !== -1) {
        enrollments.splice(enrollmentIndex, 1);
    }

    return enrollmentIndex;
}

export function removeEnrollment(userId, courseId) {
    console.log(`\tDAO - remove user ${userId} from course ${courseId}`);
    const { enrollments } = Database;

    const initSize = enrollments.length;
    Database.enrollments = enrollments.filter(e => e.user !== userId && e.course !== courseId);

    return initSize - Database.enrollments.length;
}

export function getUserEnrollments(userId) {
    console.log(`\tDAO - get enrollments for user ${userId}`);
    return Database.enrollments.filter((enrollment) => enrollment.user === userId);
}
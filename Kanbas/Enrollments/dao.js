import Database from "../Database/index.js";

export function enrollUserInCourse(userId, courseId) {
    console.log(`\tDAO - add user ${userId} to course ${courseId}`)

    const initSize = Database.enrollments.length;
    Database.enrollments.push({ _id: Date.now().toString(), user: userId, course: courseId });

    return Database.enrollments.length - initSize;
}

export function unenrollUserFromCourse(userId, courseId) {
    console.log(`\tDAO - remove user ${userId} from course ${courseId}`);
    const { enrollments } = Database;

    const enrollmentIndex = enrollments.findIndex((enrollment) => enrollment.user === userId && enrollment.course === courseId)
    if (enrollmentIndex !== -1) {
        Database.enrollments = enrollments.filter((enrollment) => enrollment.user === userId && enrollment.course === courseId);
    }

    return enrollmentIndex;
}

export function removeEnrollment(userId, courseId) {
    console.log(`\tDAO - remove user ${userId} from course ${courseId}`);
    const { enrollments } = Database;

    const initSize = enrollments.length;
    Database.enrollments = enrollments.filter(e => {
        const sameUser = e.user === userId;
        const sameCourse = e.course === courseId;
        if (sameUser && sameCourse) {
            console.log(`\t\tremoving ${JSON.stringify(e)}`);
            return false;
        } else {
            return true;
        }
    });

    return initSize - Database.enrollments.length;
}

export function getUserEnrollments(userId) {
    console.log(`\tDAO - get enrollments for user ${userId}`);
    return Database.enrollments.filter((enrollment) => enrollment.user === userId);
}
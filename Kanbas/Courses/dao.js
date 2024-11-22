import Database from "../Database/index.js";

export function findAllCourses() {
  return Database.courses;
}

//4.4.1
export function findCoursesForEnrolledUser(userId) {
  const { courses, enrollments } = Database;
  const enrolledCourses = courses.filter((course) =>
    enrollments.some((enrollment) => enrollment.user === userId && enrollment.course === course._id));
  return enrolledCourses;
}

//4.4.2
export function createCourse(course) {
  //timestamp id for the course
  const newCourse = { ...course, _id: Date.now().toString() };
  //add course to our list of courses
  Database.courses = [...Database.courses, newCourse];
  return newCourse;
}

//4.4.3
export function deleteCourse(courseId) {
  const { courses, enrollments } = Database;
  Database.courses = courses.filter((course) => course._id !== courseId);
  Database.enrollments = enrollments.filter(
    (enrollment) => enrollment.course !== courseId
  );
}

//4.4.4
export function updateCourse(courseId, courseUpdates) {
  const { courses } = Database;
  const course = courses.find((course) => course._id === courseId);
  Object.assign(course, courseUpdates);
  return course;
}


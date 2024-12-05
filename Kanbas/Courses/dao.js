import model from "./model.js";
import getUserEnrollments from "../Enrollments/dao.js"

export function findAllCourses() {
  return model.find();
}

export function findCoursesForEnrolledUser(userId) {
  // const { courses, enrollments } = Database;
  enrollments = getUserEnrollments(userId);
  courses = model.find();

  //TODO: turn this into filter object
  const enrolledCourses = courses.filter((course) =>
    enrollments.some((enrollment) => enrollment.user === userId && enrollment.course === course._id));
  return enrolledCourses;
}

export function createCourse(course) {
  //timestamp id for the course
  // const newCourse = { ...course, _id: Date.now().toString() };
  //Database.courses = [...Database.courses, newCourse];
  const createdCourse = model.create(course);
  return createdCourse;
}

export function deleteCourse(courseId) {
  // const { courses, enrollments } = Database;
  // Database.courses = courses.filter((course) => course._id !== courseId);
  // //also remove any enrollments for the deleted course
  // Database.enrollments = enrollments.filter(
  //   (enrollment) => enrollment.course !== courseId
  // );
  return model.deleteOne({ _id: courseId });
}

export function updateCourse(courseId, courseUpdates) {
  // const { courses } = Database;
  // const course = courses.find((course) => course._id === courseId);
  // Object.assign(course, courseUpdates);
  // return course;

  return model.updateOne({ _id: courseId }, { $set: courseUpdates });
}


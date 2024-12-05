import model from "./model.js";
import * as enrollmentsDao from "../Enrollments/dao.js"

export function findAllCourses() {
  return model.find();
}

export function findCoursesForEnrolledUser(userId) {
  //the ids for all the courses this user is enrolled in
  enrollments = enrollmentsDao.getUserEnrollments(userId).map(e => e.course);

  return model.find({ _id: { $in: enrollments } });

  // const { courses, enrollments } = Database;
  // const enrolledCourses = courses.filter((course) =>
  //   enrollments.some((enrollment) => enrollment.user === userId && enrollment.course === course._id));
  // return enrolledCourses;
}

export function createCourse(course) {
  const createdCourse = model.create(course);
  return createdCourse;

  //timestamp id for the course
  // const newCourse = { ...course, _id: Date.now().toString() };
  //Database.courses = [...Database.courses, newCourse];
}

export function deleteCourse(courseId) {
  return model.deleteOne({ _id: courseId });

  // const { courses, enrollments } = Database;
  // Database.courses = courses.filter((course) => course._id !== courseId);
  // //also remove any enrollments for the deleted course
  // Database.enrollments = enrollments.filter(
  //   (enrollment) => enrollment.course !== courseId
  // );
}

export function updateCourse(courseId, courseUpdates) {
  return model.updateOne({ _id: courseId }, { $set: courseUpdates });

  // const { courses } = Database;
  // const course = courses.find((course) => course._id === courseId);
  // Object.assign(course, courseUpdates);
  // return course;
}


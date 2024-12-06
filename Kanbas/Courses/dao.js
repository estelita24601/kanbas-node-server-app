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
  delete course._id; //remove any existing id so our db set the id
  return model.create(course);
}

export function deleteCourse(courseId) {
  return model.deleteOne({ _id: courseId });
}

export function updateCourse(courseId, courseUpdates) {
  return model.updateOne({ _id: courseId }, { $set: courseUpdates });
}


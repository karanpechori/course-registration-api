import { relations } from "drizzle-orm";
import { courseRequirements, courses } from "./courses";
import { students } from "./students";
import { register } from "./register";
import { teachers } from "./teachers";
import { timeslots } from "./timeslots";

/* Students */
export const studentRelations = relations(students, ({ many }) => ({
  registeredCourses: many(register),
}));

/* Teachers */

export const teacherRelations = relations(teachers, ({ many }) => ({
  timeslots: many(timeslots),
}));

/* Courses */

export const coursesRelations = relations(courses, ({ many }) => ({
  requirements: many(courseRequirements, { relationName: "requirements" }),
  requiredIn: many(courseRequirements, { relationName: "required-in" }),
  slots: many(timeslots, { relationName: "timeslots" }),
}));

export const courseRequirementsRelations = relations(
  courseRequirements,
  ({ one }) => ({
    course: one(courses, {
      fields: [courseRequirements.courseId],
      references: [courses.id],
      relationName: "requirements",
    }),
    requiredCourse: one(courses, {
      fields: [courseRequirements.requiredCourseId],
      references: [courses.id],
      relationName: "required-in",
    }),
  })
);

/* Register */

export const registerRelations = relations(register, ({ one }) => ({
  student: one(students, {
    fields: [register.studentId],
    references: [students.id],
  }),
  course: one(courses, {
    fields: [register.courseId],
    references: [courses.id],
  }),
}));

/* Time Slots */
export const timeslotsRelations = relations(timeslots, ({ one }) => ({
  course: one(courses, {
    fields: [timeslots.courseId],
    references: [courses.id],
    relationName: "timeslots",
  }),
  teacher: one(teachers, {
    fields: [timeslots.teacherId],
    references: [teachers.id],
  }),
}));

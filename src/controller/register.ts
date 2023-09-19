import db from "@/db";
import { courses, students, register } from "@/db/schema";
import { isClashing } from "@/shared/is-clashing";
import { eq, and } from "drizzle-orm";
import type { Request, Response } from "express";

export async function addRegistry(req: Request, res: Response) {
  const { studentId, courseId } = req.body;

  if (!(courseId && studentId)) {
    return res.status(400).send("Bad request");
  }

  const foundCourse = await db.query.courses.findFirst({
    where: eq(courses.id, Number(courseId)),
    with: {
      requirements: true,
      slots: true,
    },
  });

  if (!foundCourse) {
    return res.status(400).send("Course not found");
  }

  const foundstudent = await db.query.students.findFirst({
    where: eq(students.id, Number(studentId)),
  });

  if (!foundstudent) {
    return res.status(400).send("Student not found");
  }
  const existingStudents = await db.query.register.findMany({
    where: and(
      eq(register.courseId, Number(courseId)),
      eq(register.isCompleted, false)
    ),
  });

  if (existingStudents.length >= foundCourse.maxCapacity) {
    return res.status(400).send("Student exceeded than max capacity");
  }

  const ongoingCourses = await db.query.register.findMany({
    where: and(
      eq(register.studentId, Number(studentId)),
      eq(register.isCompleted, false)
    ),
    with: {
      course: {
        with: {
          slots: true,
        },
      },
    },
  });

  if (ongoingCourses.length >= 5) {
    return res.status(400).send("Student already registered 5 courses");
  }

  const completedCourses = await db.query.register.findMany({
    where: and(
      eq(register.studentId, Number(studentId)),
      eq(register.isCompleted, true)
    ),
  });

  const isReqFullfilled = foundCourse.requirements.every((requirement) => {
    return completedCourses
      .map((c) => c.courseId)
      .includes(requirement.requiredCourseId);
  });

  if (!isReqFullfilled) {
    return res.status(400).send("Student not fullfilled requirements");
  }

  const isClashingForExistingSlots = foundCourse.slots.some((slot) => {
    const prevSlots = ongoingCourses.flatMap((item) => item.course.slots);
    return isClashing(slot, prevSlots);
  });

  if (isClashingForExistingSlots) {
    return res.status(400).send("Clashing timeslots");
  }

  await db.insert(register).values({
    studentId,
    courseId,
  });

  return res.send("done");
}

export async function promoteRegistry(req: Request, res: Response) {
  const { id } = req.body;
  const foundregister = await db.query.register.findFirst({
    where: eq(register.id, Number(id)),
  });
  if (!foundregister) {
    return res.status(400).send("Register not found");
  }
  await db
    .update(register)
    .set({ isCompleted: true })
    .where(eq(register.id, Number(id)));

  return res.send("update done");
}

export async function getRegistries(req: Request, res: Response) {
  const register = await db.query.register.findMany();
  return res.send(register);
}

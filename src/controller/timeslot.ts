import db from "@/db";
import { courses, teachers, timeslots } from "@/db/schema";
import { isClashing } from "@/shared/is-clashing";
import { eq, and } from "drizzle-orm";
import type { Request, Response } from "express";

export async function addTimeslot(req: Request, res: Response) {
  const { courseId, teacherId, date, time, durationMinutes } = req.body;

  if (!(courseId && teacherId && date && time)) {
    return res.status(400).send("Bad request");
  }

  const foundCourse = await db.query.courses.findFirst({
    where: eq(courses.id, Number(courseId)),
  });

  if (!foundCourse) {
    return res.status(400).send("Course not found");
  }

  const foundteacher = await db.query.teachers.findFirst({
    where: eq(teachers.id, Number(teacherId)),
  });

  if (!foundteacher) {
    return res.status(400).send("Teacher not found");
  }

  const slotsOnSameDay = await db.query.timeslots.findMany({
    where: and(eq(timeslots.date, date), eq(timeslots.teacherId, teacherId)),
  });

  if (
    slotsOnSameDay.length > 0 &&
    isClashing({ time, durationMinutes }, slotsOnSameDay)
  ) {
    return res.status(400).send("Clashing timeslots");
  }

  await db.insert(timeslots).values({
    courseId,
    teacherId,
    date,
    time,
    durationMinutes,
  });

  return res.status(200).send("OK");
}

export async function getTimeslots(req: Request, res: Response) {
  const timeslots = await db.query.timeslots.findMany();

  return res.send(timeslots);
}

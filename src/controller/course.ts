import db from "@/db";
import { courses, courseRequirements } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";
import type { Request, Response } from "express";

export async function addCourse(req: Request, res: Response) {
  const { name, maxCapacity, requiredCourses } = req.body;

  if (requiredCourses && Array.isArray(requiredCourses)) {
    const foundCourses = await db.query.courses.findMany({
      where: inArray(courses.id, requiredCourses),
    });

    if (foundCourses.length !== requiredCourses.length) {
      return res.status(400).send("Required courses not found");
    }

    const [{ insertId }] = await db
      .insert(courses)
      .values({ name, maxCapacity });

    await db.insert(courseRequirements).values(
      requiredCourses.map((id) => ({
        courseId: insertId,
        requiredCourseId: Number(id),
      }))
    );
  } else {
    await db.insert(courses).values({ name, maxCapacity });
  }

  res.send("done");
}

export async function getCourses(req: Request, res: Response) {
  const courses = await db.query.courses.findMany();
  res.send(courses);
}

export async function getCourseById(req: Request, res: Response) {
  const { id } = req.params;
  const course = await db.query.courses.findFirst({
    where: eq(courses.id, Number(id)),
  });
  res.send(course);
}

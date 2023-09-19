import db from "@/db";
import { teachers } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { Request, Response } from "express";

export async function addTeacher(req: Request, res: Response) {
  const { name } = req.body;
  await db.insert(teachers).values({ name });
  res.send("done");
}

export async function getTeachers(req: Request, res: Response) {
  const teachers = await db.query.teachers.findMany();
  res.send(teachers);
}

export async function getTeacherById(req: Request, res: Response) {
  const { id } = req.params;
  const teacher = await db.query.teachers.findFirst({
    where: eq(teachers.id, Number(id)),
  });
  res.send(teacher);
}

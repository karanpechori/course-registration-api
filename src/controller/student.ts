import db from "@/db";
import { students } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { Request, Response } from "express";

export async function addStudent(req: Request, res: Response) {
  const { name } = req.body;
  await db.insert(students).values({ name });
  res.send("done");
}

export async function getStudents(req: Request, res: Response) {
  const students = await db.query.students.findMany();
  res.send(students);
}

export async function getStudentById(req: Request, res: Response) {
  const { id } = req.params;
  const student = await db.query.students.findFirst({
    where: eq(students.id, Number(id)),
  });
  res.send(student);
}

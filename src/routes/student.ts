import { addStudent, getStudentById, getStudents } from "@/controller/student";
import { Router } from "express";

const router = Router();

router.post("/", addStudent);

router.get("/", getStudents);

router.get("/:id", getStudentById);

export default router;

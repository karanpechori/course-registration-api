import { addTeacher, getTeacherById, getTeachers } from "@/controller/teacher";

import { Router } from "express";

const router = Router();

router.post("/", addTeacher);

router.get("/", getTeachers);

router.get("/:id", getTeacherById);

export default router;

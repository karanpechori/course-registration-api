import { addCourse, getCourseById, getCourses } from "@/controller/course";

import { Router } from "express";

const router = Router();

router.post("/", addCourse);

router.get("/", getCourses);

router.get("/:id", getCourseById);

export default router;

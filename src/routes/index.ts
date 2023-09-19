import { Router } from "express";
import course from "./course";
import timeslot from "./timeslot";
import register from "./register";
import teacher from "./teacher";
import student from "./student";

const router = Router();

router.use("/course", course);
router.use("/timeslot", timeslot);
router.use("/register", register);
router.use("/teacher", teacher);
router.use("/student", student);

export default router;

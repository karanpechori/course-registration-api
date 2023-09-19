import { Router } from "express";
import { addTimeslot, getTimeslots } from "@/controller/timeslot";

const router = Router();

router.post("/", addTimeslot);

router.get("/", getTimeslots);

export default router;

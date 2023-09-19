import {
  addRegistry,
  getRegistries,
  promoteRegistry,
} from "@/controller/register";

import { Router } from "express";

const router = Router();

router.post("/", addRegistry);

router.post("/promote", promoteRegistry);

router.get("/", getRegistries);

export default router;

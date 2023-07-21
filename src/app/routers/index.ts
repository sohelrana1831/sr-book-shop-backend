import express from "express";
import { AuthRouters } from "../modules/auth/authRouters";
const router = express.Router();

const modulesRouters = [
  {
    pathName: "/auth",
    routeName: AuthRouters,
  },
];
modulesRouters.forEach((route) => router.use(route.pathName, route.routeName));

export default router;

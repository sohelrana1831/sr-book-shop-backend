import express from "express";
import { BookRouters } from "../module/book/bookRouters";
const router = express.Router();

const modulesRouters = [
  {
    pathName: "/book",
    routeName: BookRouters,
  },
];
modulesRouters.forEach((route) => router.use(route.pathName, route.routeName));

export default router;

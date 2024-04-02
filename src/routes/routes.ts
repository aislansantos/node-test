
import * as ApiController from "../controllers/api.Controller";
import { Router } from "express";


const router = Router();

router.get("/ping", ApiController.ping);

router.post("/register", ApiController.register);
router.post("/login", ApiController.login);

router.get("/list", ApiController.list);




export default router;
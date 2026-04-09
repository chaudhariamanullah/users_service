import { Router } from "express";
import UserController from "../controller/controller.users.js";

const route = Router();

route.get("/",UserController.getAll);
route.get("/:user_public_id",UserController.getOne);
route.post("/",UserController.add);
route.post("/google",UserController.googleAdd);
route.patch("/:user_public_id",UserController.edit);
route.delete("/:user_public_id",UserController.remove);
route.get("/phone-exists/:phone", UserController.phoneExists);

export default route;

import * as express from "express";
import { checkAuthenticated403 } from "../../auth/checkAuth";

const router = express.Router();

router.post("/rooms", checkAuthenticated403, (req, res) => {
  res.send("Help");
});

export default router;
import { logout } from "../../controllers/auth/logout.controller";
import router from "./login.routes";

router.post('/logout', logout);
export default router;
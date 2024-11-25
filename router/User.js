const router = require("express").Router();
const user = require("../controllers/User")

router.post("/register", user.register);
router.post("/login", user.login);

module.exports = router;
const router = require("express").Router();
const User  =  require("./User")

router.use("/api/user", User)

module.exports = router;
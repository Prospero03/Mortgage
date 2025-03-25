const router = require("express").Router();
const mortgageController = require("../controller/mortgageController")

router.post("/mortgage", mortgageController.mortgageSave)

module.exports = router;
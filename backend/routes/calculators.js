
const router = require("express").Router();
const CalculatorController = require("../controller/calculatorController");
const EmailController = require("../controller/emailController")
const adminController = require("../controller/adminController");
const authMiddleware = require("../middlewares/authMiddleware");


router.get("/fetchAllCalculator", CalculatorController.fetchAllCalculators);

router.get("/calculator/:id", 
  authMiddleware.verifyToken,
  authMiddleware.authorizeRole("admin"),
  CalculatorController.getCalculator
);

// Редактирование калькулятора
router.put("/editCalculator/:id",
            authMiddleware.verifyToken,
            authMiddleware.authorizeRole("admin"),
            CalculatorController.editCalculator)

// Удаление калькулятора
router.delete("/deleteCalculator/:id",  // Используем DELETE вместо PUT
  authMiddleware.verifyToken,
  authMiddleware.authorizeRole("admin"),
  CalculatorController.deleteCalculator
);

// Новый маршрут для отправки email
router.post("/sendEmail", EmailController.emailSend)


module.exports = router;


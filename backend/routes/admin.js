const router = require("express").Router();
const adminController = require("../controller/adminController");
const authMiddleware = require("../middlewares/authMiddleware");

// Аутентификация
router.post("/adminLogin", adminController.adminLogin);

// Добавление калькулятора
router.post("/add-mortgage",
    authMiddleware.verifyToken,
    authMiddleware.authorizeRole("admin"),
    adminController.addCalculator
);

// Получение всех расчетов ипотеки
router.get("/mortgage-calculations",
    authMiddleware.verifyToken,
    authMiddleware.authorizeRole("admin"),
    adminController.getAllMortgageCalculations
);

// Экспорт расчетов
router.get("/mortgage-calculations/export",
    authMiddleware.verifyToken,
    authMiddleware.authorizeRole("admin"),
    adminController.exportMortgageCalculations
);

module.exports = router;
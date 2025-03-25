const router = require("express").Router();
const userController = require("../controller/userController");
const authMiddleware = require("../middlewares/authMiddleware");
//Регистрация (Sign-up)
router.post("/sign-up",userController.signupUser);


//Авторизация (Login)
router.post("/log-in",userController.loginUser);

//Обновление страницы
router.get("/check-cookie", userController.checkCookie);

//Выход Пользователя
router.post("/logout", userController.logout);

router.get("/getProfileData",
    authMiddleware.verifyToken,
    authMiddleware.authorizeRole("user"),
    userController.getProfileData
    );
  
module.exports = router;
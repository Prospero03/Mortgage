const Calculator = require("../models/calculator");


exports.fetchAllCalculators = async (req,res) =>{
    try {
        const calculators = await Calculator.find().sort({createdAt: -1});
        res
            .status(200)
            .json({success:true, calculators})
    } catch (error) {
        res.status(500).json({error: "Ошибка Сервера"})
    }
}

//Редактирование Калькуляторов

exports.editCalculator = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, number } = req.body;
      
      // Используем findByIdAndUpdate вместо findByIdAndDelete
      const updatedCalculator = await Calculator.findByIdAndUpdate(
        id,
        { title, description, number },
        { new: true } // Возвращает обновленный документ
      );
  
      if (!updatedCalculator) {
        return res.status(404).json({ success: false, error: "Калькулятор не найден" });
      }
  
      res.status(200).json({ 
        success: true, 
        message: "Калькулятор успешно отредактирован",
        calculator: updatedCalculator 
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Ошибка сервера" });
    }
  }

//Удаление Калькуляторов

exports.deleteCalculator = async (req, res) => {
    try {
      const { id } = req.params;
      await Calculator.findByIdAndDelete(id); // Правильный метод
      res.status(200).json({ success: true, message: "Калькулятор успешно удалён" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Ошибка сервера" });
    }
  }

  //Получение Калькулятора
  exports.getCalculator = async (req, res) => {
    try {
      const calculator = await Calculator.findById(req.params.id);
      if (!calculator) {
        return res.status(404).json({ success: false, error: "Калькулятор не найден" });
      }
      res.status(200).json({ success: true, calculator });
    } catch (error) {
      res.status(500).json({ success: false, error: "Ошибка сервера" });
    }
  }
const { sendEmail } = require('../nodemailer/sendEmail'); // Импортируем функцию sendEmail


exports.emailSend = async (req, res) => {
    const { to, subject, text } = req.body;
    try {
      await sendEmail(to, subject, text);
      res.status(200).json({ success: true, message: 'Данные успешно отправлены на Email' });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Ошибка Nodemailer' });
    }
  };
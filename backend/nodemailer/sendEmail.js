//nodemailer
const nodemailer = require('nodemailer');

// Настройка транспорта для nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // Используйте Gmail или другой SMTP-сервис
  auth: {
    user: process.env.EMAIL_USER, // Ваш email (лучше использовать переменные окружения)
    pass: process.env.EMAIL_PASS, // Ваш пароль от email (лучше использовать переменные окружения)
  },
});

// Функция для отправки email
const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER, // Отправитель
      to, // Получатель
      subject, // Тема письма
      text, // Текст письма
    });
    console.log('Данные успешно отправлены на Email');
  } catch (error) {
    console.error('Ошибка Nodemailer:', error);
  }
};

// Экспортируем функцию для использования в других частях приложения
module.exports = { sendEmail };
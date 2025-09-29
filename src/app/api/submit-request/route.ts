import { NextRequest, NextResponse } from 'next/server';

// Ваши данные из Green API (замените на актуальные)
const API_URL = "https://7700.api.greenapi.com";
const ID_INSTANCE = "7700282474";
const API_TOKEN_INSTANCE = "6ac6e2edd6a94d9990bf32b96135d382d954bd87a719413c88";
const WHATSAPP_GROUP_ID = "120363404275527325@g.us";

// Функция для отправки в WhatsApp
async function sendToWhatsApp(message: string) {
  try {
    const response = await fetch(`${API_URL}/waInstance${ID_INSTANCE}/sendMessage/${API_TOKEN_INSTANCE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chatId: WHATSAPP_GROUP_ID,
        message: message
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending to WhatsApp:', error);
    throw error;
  }
}

// Функция для форматирования номера телефона
function formatPhoneNumber(phone: string): string {
  // Удаляем все нецифровые символы
  const cleaned = phone.replace(/\D/g, '');
  
  // Форматируем в формат +7 777 123 45 67
  if (cleaned.length === 11 && cleaned.startsWith('8')) {
    return `+7 ${cleaned.slice(1, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7, 9)} ${cleaned.slice(9)}`;
  } else if (cleaned.length === 11 && cleaned.startsWith('7')) {
    return `+7 ${cleaned.slice(1, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7, 9)} ${cleaned.slice(9)}`;
  } else if (cleaned.length === 10) {
    return `+7 ${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 8)} ${cleaned.slice(8)}`;
  }
  
  // Если формат не распознан, возвращаем оригинал
  return phone;
}

// Функция для проверки даты
function isValidDate(dateString: string): { isValid: boolean; error?: string } {
  const selectedDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Сбрасываем время для сравнения только дат

  if (selectedDate < today) {
    return { 
      isValid: false, 
      error: 'Нельзя выбрать прошедшую дату' 
    };
  }

  return { isValid: true };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, name, phone, date, time } = body;

    // Валидация обязательных полей
    if (!name || !phone) {
      return NextResponse.json(
        { success: false, message: 'Имя и телефон обязательны для заполнения' },
        { status: 400 }
      );
    }

    // Валидация номера телефона
    const phoneRegex = /^[\+]?[7-8]?[0-9\s\-\(\)]{10,15}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
      return NextResponse.json(
        { success: false, message: 'Введите корректный номер телефона' },
        { status: 400 }
      );
    }

    // Валидация даты для формы расписания
    if (type === 'schedule') {
      if (!date || !time) {
        return NextResponse.json(
          { success: false, message: 'Для записи на видеосозвон необходимо указать дату и время' },
          { status: 400 }
        );
      }

      const dateValidation = isValidDate(date);
      if (!dateValidation.isValid) {
        return NextResponse.json(
          { success: false, message: dateValidation.error },
          { status: 400 }
        );
      }
    }

    // Форматируем номер телефона
    const formattedPhone = formatPhoneNumber(phone);

    // Формируем сообщение
    let message = '';
    if (type === 'form') {
      message = `📞 Новая заявка на обратный звонок!\n👤 Имя: ${name}\n📱 Телефон: ${formattedPhone}`;
    } else if (type === 'schedule') {
      message = `🎥 Новая заявка на видеосозвон!\n👤 Имя: ${name}\n📱 Телефон: ${formattedPhone}\n📅 Дата: ${date}\n⏰ Время: ${time}`;
    }

    // Отправляем в WhatsApp
    await sendToWhatsApp(message);

    // Логируем в консоль (в продакшене можно добавить запись в файл)
    console.log('Form submitted:', {
      type,
      name,
      phone: formattedPhone,
      date,
      time,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      message: type === 'form' 
        ? 'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.' 
        : 'Заявка на видеосозвон успешно отправлена! Мы подтвердим время созвона.'
    });

  } catch (error) {
    console.error('Error submitting form:', error);
    return NextResponse.json(
      { success: false, message: 'Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.' },
      { status: 500 }
    );
  }
}
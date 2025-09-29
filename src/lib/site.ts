// src/lib/site.ts
const SITE = {
  // Ссылки
  instagram: "https://www.instagram.com/raycon.kz", // замените your_instagram на ваш логин
  email: "mailto:info@yourdomain.com", // замените на реальный email
  whatsApp: "https://wa.me/77078469999", // международный формат без "+"

  contacts: {
    sales: {
      label: "Отдел продаж",
      phone: "+7 707 846 99 99",
      tel: "tel:+77078469999",
    },
    support: {
      label: "Поддержка",
      phone: "+7 707 846 55 55",
      tel: "tel:+77078465555",
    },
  },
} as const;

export default SITE;

// tailwind.config.js
module.exports = {
    // ... другие настройки
    theme: {
      extend: {
        // ... другие расширения
        willChange: {
          'transform': 'transform', // Добавьте это
        },
      },
    },
    // ...
  }
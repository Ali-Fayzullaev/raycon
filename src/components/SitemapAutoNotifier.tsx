'use client';

import { useEffect } from 'react';

/**
 * Компонент для автоматического уведомления поисковых систем
 * Запускается только в production и только один раз за сессию
 */
export function SitemapAutoNotifier() {
  useEffect(() => {
    // Проверяем, нужно ли уведомлять
    const shouldNotify = 
      process.env.NODE_ENV === 'production' && 
      typeof window !== 'undefined' && 
      !sessionStorage.getItem('sitemap-notified');

    if (shouldNotify) {
      // Задержка для того чтобы страница полностью загрузилась
      const timer = setTimeout(async () => {
        try {
          console.log('🗺️ Автоматическое уведомление о sitemap...');
          
          const response = await fetch('/api/notify-sitemap', {
            method: 'GET',
          });
          
          if (response.ok) {
            const result = await response.json();
            console.log('✅ Поисковые системы уведомлены:', result);
            
            // Отмечаем, что уведомление отправлено в этой сессии
            sessionStorage.setItem('sitemap-notified', new Date().toISOString());
          }
        } catch (error) {
          console.error('❌ Ошибка автоуведомления sitemap:', error);
        }
      }, 5000); // 5 секунд после загрузки

      return () => clearTimeout(timer);
    }
  }, []);

  // Компонент ничего не рендерит
  return null;
}

/**
 * Хук для ручного уведомления поисковых систем
 */
export function useSitemapNotification() {
  const notifySearchEngines = async (engine?: 'google' | 'yandex') => {
    try {
      const url = '/api/notify-sitemap';
      const options: RequestInit = {
        method: engine ? 'POST' : 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        ...(engine && {
          body: JSON.stringify({ engine })
        })
      };

      const response = await fetch(url, options);
      const result = await response.json();
      
      return {
        success: response.ok,
        data: result
      };
      
    } catch (error) {
      console.error('❌ Ошибка при уведомлении поисковых систем:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Неизвестная ошибка'
      };
    }
  };

  const regenerateSitemap = async (notify = true) => {
    try {
      const response = await fetch('/api/sitemap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          action: 'regenerate',
          notify 
        })
      });
      
      const result = await response.json();
      
      return {
        success: response.ok,
        data: result
      };
      
    } catch (error) {
      console.error('❌ Ошибка при регенерации sitemap:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Неизвестная ошибка'
      };
    }
  };

  return {
    notifySearchEngines,
    regenerateSitemap
  };
}
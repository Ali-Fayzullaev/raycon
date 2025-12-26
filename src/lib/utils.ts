import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Уведомляет Google об обновлении sitemap
 * @returns Promise<boolean> - true если успешно, false если ошибка
 */
export async function notifyGoogleAboutSitemap(): Promise<boolean> {
  const sitemapUrl = 'https://raycon.kz/sitemap.xml';
  const googlePingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;
  
  try {
    const response = await fetch(googlePingUrl);
    if (response.ok) {
      console.log('✅ Google уведомлён об обновлении sitemap');
      return true;
    } else {
      console.error('❌ Google вернул ошибку:', response.status, response.statusText);
      return false;
    }
  } catch (error) {
    console.error('❌ Ошибка уведомления Google:', error);
    return false;
  }
}

/**
 * Уведомляет Yandex об обновлении sitemap
 * @returns Promise<boolean> - true если успешно, false если ошибка
 */
export async function notifyYandexAboutSitemap(): Promise<boolean> {
  const sitemapUrl = 'https://raycon.kz/sitemap.xml';
  const yandexPingUrl = `https://webmaster.yandex.ru/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;
  
  try {
    const response = await fetch(yandexPingUrl);
    if (response.ok) {
      console.log('✅ Yandex уведомлён об обновлении sitemap');
      return true;
    } else {
      console.error('❌ Yandex вернул ошибку:', response.status, response.statusText);
      return false;
    }
  } catch (error) {
    console.error('❌ Ошибка уведомления Yandex:', error);
    return false;
  }
}

/**
 * Уведомляет все поисковые системы об обновлении sitemap
 * @returns Promise<{google: boolean, yandex: boolean}>
 */
export async function notifyAllSearchEnginesAboutSitemap() {
  const [googleResult, yandexResult] = await Promise.allSettled([
    notifyGoogleAboutSitemap(),
    notifyYandexAboutSitemap()
  ]);

  const result = {
    google: googleResult.status === 'fulfilled' ? googleResult.value : false,
    yandex: yandexResult.status === 'fulfilled' ? yandexResult.value : false
  };

  console.log('📊 Результаты уведомлений:', result);
  return result;
}

/**
 * Автоматически уведомляет поисковые системы при деплое/сборке
 * Можно вызывать в middleware или при сборке проекта
 */
export async function autoNotifySitemapOnBuild() {
  if (process.env.NODE_ENV === 'production') {
    console.log('🚀 Автоматическое уведомление поисковых систем о sitemap...');
    
    // Задержка 30 сек, чтобы sitemap был доступен
    setTimeout(async () => {
      try {
        await notifyAllSearchEnginesAboutSitemap();
      } catch (error) {
        console.error('❌ Ошибка автоуведомления:', error);
      }
    }, 30000);
  }
}

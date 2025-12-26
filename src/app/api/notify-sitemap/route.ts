import { NextRequest, NextResponse } from 'next/server';
import { notifyAllSearchEnginesAboutSitemap } from '@/lib/utils';

/**
 * API endpoint для уведомления поисковых систем об обновлении sitemap
 * GET /api/notify-sitemap - уведомляет все поисковые системы
 * POST /api/notify-sitemap - уведомляет конкретную поисковую систему
 */

export async function GET() {
  try {
    console.log('🚀 Начинаем уведомление поисковых систем о sitemap...');
    
    const results = await notifyAllSearchEnginesAboutSitemap();
    
    const success = results.google || results.yandex;
    const message = `Уведомления отправлены: Google ${results.google ? '✅' : '❌'}, Yandex ${results.yandex ? '✅' : '❌'}`;
    
    return NextResponse.json({
      success,
      results,
      message,
      timestamp: new Date().toISOString()
    }, { 
      status: success ? 200 : 207 // 207 Multi-Status если частичный успех
    });
    
  } catch (error) {
    console.error('❌ Критическая ошибка при уведомлении поисковых систем:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Внутренняя ошибка сервера',
      message: 'Не удалось отправить уведомления поисковым системам',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { engine } = body;
    
    console.log(`🎯 Уведомляем ${engine || 'все поисковые системы'} о sitemap...`);
    
    let result;
    let message;
    
    if (engine === 'google') {
      const { notifyGoogleAboutSitemap } = await import('@/lib/utils');
      result = await notifyGoogleAboutSitemap();
      message = `Google ${result ? '✅' : '❌'}`;
    } else if (engine === 'yandex') {
      const { notifyYandexAboutSitemap } = await import('@/lib/utils');
      result = await notifyYandexAboutSitemap();
      message = `Yandex ${result ? '✅' : '❌'}`;
    } else {
      const results = await notifyAllSearchEnginesAboutSitemap();
      result = results.google || results.yandex;
      message = `Google ${results.google ? '✅' : '❌'}, Yandex ${results.yandex ? '✅' : '❌'}`;
    }
    
    return NextResponse.json({
      success: result,
      message,
      timestamp: new Date().toISOString(),
      engine: engine || 'all'
    }, { 
      status: result ? 200 : 400
    });
    
  } catch (error) {
    console.error('❌ Ошибка при обработке POST запроса:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Неверный формат запроса',
      message: 'Проверьте параметры запроса',
      timestamp: new Date().toISOString()
    }, { status: 400 });
  }
}
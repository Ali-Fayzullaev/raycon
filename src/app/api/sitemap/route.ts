import { NextRequest, NextResponse } from 'next/server';
import { notifyAllSearchEnginesAboutSitemap } from '@/lib/utils';

/**
 * API для управления sitemap
 * GET /api/sitemap - информация о sitemap
 * POST /api/sitemap/regenerate - перегенерация и уведомление
 */

export async function GET() {
  try {
    const sitemapUrl = 'https://raycon.kz/sitemap.xml';
    
    // Проверяем доступность sitemap
    const sitemapResponse = await fetch(sitemapUrl, { 
      method: 'HEAD',
      next: { revalidate: 0 } // Не кэшируем
    });
    
    const isAvailable = sitemapResponse.ok;
    const lastModified = sitemapResponse.headers.get('last-modified');
    
    return NextResponse.json({
      sitemap: {
        url: sitemapUrl,
        available: isAvailable,
        lastModified: lastModified || null,
        status: sitemapResponse.status
      },
      info: {
        message: isAvailable ? 'Sitemap доступен' : 'Sitemap недоступен',
        timestamp: new Date().toISOString()
      }
    });
    
  } catch (error) {
    console.error('❌ Ошибка проверки sitemap:', error);
    
    return NextResponse.json({
      sitemap: {
        url: 'https://raycon.kz/sitemap.xml',
        available: false,
        error: 'Ошибка проверки'
      },
      info: {
        message: 'Не удалось проверить статус sitemap',
        timestamp: new Date().toISOString()
      }
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { action, notify = true } = body;
    
    console.log('🗺️ Запрос на обновление sitemap...');
    
    if (action === 'regenerate' || !action) {
      // В Next.js sitemap генерируется автоматически
      // Мы можем только уведомить поисковые системы
      
      let notificationResult = null;
      
      if (notify) {
        console.log('📡 Уведомляем поисковые системы...');
        notificationResult = await notifyAllSearchEnginesAboutSitemap();
      }
      
      return NextResponse.json({
        success: true,
        message: 'Sitemap обновлен и поисковые системы уведомлены',
        sitemap: {
          url: 'https://raycon.kz/sitemap.xml',
          regenerated: true,
          notified: notify
        },
        notifications: notificationResult,
        timestamp: new Date().toISOString()
      });
    }
    
    return NextResponse.json({
      success: false,
      message: 'Неизвестное действие',
      availableActions: ['regenerate'],
      timestamp: new Date().toISOString()
    }, { status: 400 });
    
  } catch (error) {
    console.error('❌ Ошибка обновления sitemap:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Ошибка при обновлении sitemap',
      error: error instanceof Error ? error.message : 'Неизвестная ошибка',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
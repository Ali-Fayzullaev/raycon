'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useSitemapNotification } from './SitemapAutoNotifier';

/**
 * Расширенный компонент для управления SEO и sitemap
 * Можно разместить в админ-панели или в служебных разделах
 */
export function SitemapNotifier() {
  const [loading, setLoading] = useState(false);
  const [lastResult, setLastResult] = useState<any>(null);
  const [sitemapInfo, setSitemapInfo] = useState<any>(null);
  
  const { notifySearchEngines, regenerateSitemap } = useSitemapNotification();

  // Проверка статуса sitemap
  const checkSitemapStatus = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/sitemap');
      const result = await response.json();
      setSitemapInfo(result);
      setLastResult({
        success: true,
        message: `Sitemap ${result.sitemap.available ? 'доступен' : 'недоступен'}`,
        timestamp: result.info.timestamp
      });
    } catch (error) {
      setLastResult({
        success: false,
        message: 'Ошибка проверки sitemap',
        error: error instanceof Error ? error.message : 'Неизвестная ошибка'
      });
    } finally {
      setLoading(false);
    }
  };

  // Уведомление поисковых систем
  const handleNotifySearchEngines = async (engine?: 'google' | 'yandex') => {
    setLoading(true);
    
    try {
      const result = await notifySearchEngines(engine);
      setLastResult({
        success: result.success,
        message: result.data?.message || (result.success ? 'Успешно уведомлено' : 'Ошибка уведомления'),
        data: result.data,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      setLastResult({
        success: false,
        message: 'Ошибка при уведомлении',
        error: error instanceof Error ? error.message : 'Неизвестная ошибка'
      });
    } finally {
      setLoading(false);
    }
  };

  // Регенерация sitemap
  const handleRegenerateSitemap = async () => {
    setLoading(true);
    
    try {
      const result = await regenerateSitemap(true);
      setLastResult({
        success: result.success,
        message: result.data?.message || (result.success ? 'Sitemap обновлен' : 'Ошибка обновления'),
        data: result.data,
        timestamp: new Date().toISOString()
      });
      
      // Обновляем информацию о sitemap
      if (result.success) {
        setTimeout(() => checkSitemapStatus(), 2000);
      }
    } catch (error) {
      setLastResult({
        success: false,
        message: 'Ошибка при регенерации',
        error: error instanceof Error ? error.message : 'Неизвестная ошибка'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold">🗺️ SEO & Sitemap Управление</h3>
          <p className="text-sm text-gray-600 mt-1">
            Управление картой сайта и уведомление поисковых систем
          </p>
        </div>

        {/* Информация о sitemap */}
        {sitemapInfo && (
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">Статус Sitemap</h4>
              <Badge variant={sitemapInfo.sitemap.available ? "default" : "destructive"}>
                {sitemapInfo.sitemap.available ? "✅ Доступен" : "❌ Недоступен"}
              </Badge>
            </div>
            
            <div className="text-sm space-y-1">
              <div>URL: <code className="bg-white px-2 py-1 rounded">{sitemapInfo.sitemap.url}</code></div>
              {sitemapInfo.sitemap.lastModified && (
                <div>Обновлен: {new Date(sitemapInfo.sitemap.lastModified).toLocaleString('ru-RU')}</div>
              )}
              <div>Статус: {sitemapInfo.sitemap.status}</div>
            </div>
          </div>
        )}

        {/* Основные действия */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Button 
            onClick={checkSitemapStatus} 
            disabled={loading}
            variant="outline"
          >
            {loading ? '⏳' : '🔍'} Проверить Sitemap
          </Button>

          <Button 
            onClick={handleRegenerateSitemap} 
            disabled={loading}
            variant="default"
          >
            {loading ? '⏳ Обновляем...' : '🔄 Обновить Sitemap'}
          </Button>
        </div>

        {/* Уведомления поисковых систем */}
        <div className="space-y-3">
          <h4 className="font-medium text-center">Уведомить поисковые системы</h4>
          
          <Button 
            onClick={() => handleNotifySearchEngines()} 
            disabled={loading}
            className="w-full"
            size="lg"
          >
            {loading ? '⏳ Отправляем...' : '🚀 Уведомить все системы'}
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button 
              onClick={() => handleNotifySearchEngines('google')} 
              disabled={loading}
              variant="outline"
            >
              {loading ? '⏳' : '🔍'} Google
            </Button>
            
            <Button 
              onClick={() => handleNotifySearchEngines('yandex')} 
              disabled={loading}
              variant="outline"
            >
              {loading ? '⏳' : '🟡'} Yandex
            </Button>
          </div>
        </div>

        {/* Результат последней операции */}
        {lastResult && (
          <div className={`p-4 rounded-lg text-sm ${
            lastResult.success 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            <div className="font-medium">
              {lastResult.success ? '✅ Успешно' : '❌ Ошибка'}
            </div>
            <div className="mt-1">{lastResult.message}</div>
            
            {lastResult.data?.notifications && (
              <div className="mt-2 space-y-1">
                <div className="text-xs font-medium">Результаты уведомлений:</div>
                <div className="text-xs">
                  Google: {lastResult.data.notifications.google ? '✅' : '❌'} | 
                  Yandex: {lastResult.data.notifications.yandex ? '✅' : '❌'}
                </div>
              </div>
            )}
            
            {lastResult.timestamp && (
              <div className="text-xs opacity-60 mt-2">
                {new Date(lastResult.timestamp).toLocaleString('ru-RU')}
              </div>
            )}
          </div>
        )}

        {/* Полезная информация */}
        <div className="text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
          <p className="font-medium mb-2">📚 Рекомендации по SEO:</p>
          <ul className="space-y-1">
            <li>• Проверяйте sitemap после добавления новых страниц</li>
            <li>• Уведомляйте поисковые системы при значительных изменениях</li>
            <li>• Обновляйте sitemap при изменении структуры сайта</li>
            <li>• Мониторьте индексацию в Search Console и Webmaster</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}
import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

const BASE_URL = 'https://raycon.kz'

// Поддерживаемые языки
const LANGUAGES = ['ru', 'kz', 'en'] as const
type Language = typeof LANGUAGES[number]

// Статические страницы с их настройками
const STATIC_PAGES = [
  {
    path: '/',
    priority: 1.0,
    changeFreq: 'daily' as const,
    languages: LANGUAGES
  },
  {
    path: '/articles',
    priority: 0.9,
    changeFreq: 'daily' as const,
    languages: LANGUAGES
  },
  // Добавьте здесь другие важные страницы
] as const

interface RouteInfo {
  path: string
  priority: number
  changeFreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  languages?: readonly Language[]
}

/**
 * Рекурсивно собирает все page.tsx файлы из директории app
 */
function getRoutes(dir: string, basePath = ''): string[] {
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    let routes: string[] = []

    for (const entry of entries) {
      // Пропускаем служебные директории и файлы
      if (
        entry.name.startsWith('_') || 
        entry.name.startsWith('.') ||
        entry.name === 'api' ||
        entry.name === 'globals.css' ||
        entry.name.includes('layout') ||
        entry.name.includes('loading') ||
        entry.name.includes('error') ||
        entry.name.includes('not-found')
      ) {
        continue
      }

      const fullPath = path.join(dir, entry.name)
      const routePath = path.join(basePath, entry.name)

      if (entry.isDirectory()) {
        // Рекурсивно обходим поддиректории
        routes = routes.concat(getRoutes(fullPath, routePath))
      }

      if (entry.isFile() && entry.name === 'page.tsx') {
        // Очищаем путь от page.tsx и нормализуем
        const cleanRoute = routePath
          .replace(/\/page\.tsx$/, '')
          .replace(/\/$/, '')
          .replace(/\\/g, '/') || '/'
        
        routes.push(cleanRoute)
      }
    }

    return routes
  } catch (error) {
    console.error(`Ошибка при чтении директории ${dir}:`, error)
    return []
  }
}

/**
 * Определяет приоритет и частоту обновления для маршрута
 */
function getRouteConfig(route: string): RouteInfo {
  // Проверяем статические страницы
  const staticPage = STATIC_PAGES.find(page => page.path === route)
  if (staticPage) {
    return {
      path: route,
      priority: staticPage.priority,
      changeFreq: staticPage.changeFreq,
      languages: staticPage.languages
    }
  }

  // Главная страница
  if (route === '/') {
    return {
      path: route,
      priority: 1.0,
      changeFreq: 'daily',
      languages: LANGUAGES
    }
  }

  // Статьи и блог
  if (route.includes('/articles') || route.includes('/blog')) {
    return {
      path: route,
      priority: 0.8,
      changeFreq: 'weekly',
      languages: LANGUAGES
    }
  }

  // Языковые версии страниц
  if (LANGUAGES.some(lang => route.startsWith(`/${lang}`))) {
    const basePriority = route === `/ru` || route === `/kz` || route === `/en` ? 0.9 : 0.7
    return {
      path: route,
      priority: basePriority,
      changeFreq: 'weekly'
    }
  }

  // Остальные страницы
  return {
    path: route,
    priority: 0.6,
    changeFreq: 'monthly',
    languages: LANGUAGES
  }
}

/**
 * Генерирует URL для всех языковых версий
 */
function generateLanguageUrls(routeConfig: RouteInfo): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = []

  // Если не указаны языки, добавляем только основной URL
  if (!routeConfig.languages) {
    urls.push({
      url: `${BASE_URL}${routeConfig.path === '/' ? '' : routeConfig.path}`,
      lastModified: new Date(),
      changeFrequency: routeConfig.changeFreq,
      priority: routeConfig.priority,
    })
    return urls
  }

  // Добавляем URL для каждого языка
  for (const lang of routeConfig.languages) {
    const langPath = routeConfig.path === '/' ? `/${lang}` : `/${lang}${routeConfig.path}`
    
    urls.push({
      url: `${BASE_URL}${langPath}`,
      lastModified: new Date(),
      changeFrequency: routeConfig.changeFreq,
      priority: routeConfig.priority,
      alternates: {
        languages: Object.fromEntries(
          routeConfig.languages.map(l => [
            l,
            `${BASE_URL}${routeConfig.path === '/' ? `/${l}` : `/${l}${routeConfig.path}`}`
          ])
        )
      }
    })
  }

  // Добавляем основной URL без языкового префикса (редирект на ru)
  if (routeConfig.path === '/') {
    urls.push({
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: routeConfig.changeFreq,
      priority: routeConfig.priority,
      alternates: {
        languages: Object.fromEntries(
          routeConfig.languages.map(lang => [
            lang,
            `${BASE_URL}/${lang}`
          ])
        )
      }
    })
  }

  return urls
}

export default function sitemap(): MetadataRoute.Sitemap {
  try {
    console.log('🗺️ Генерация sitemap...')
    
    // Находим директорию app
    const appDir = path.join(process.cwd(), 'src', 'app')
    
    if (!fs.existsSync(appDir)) {
      console.error('❌ Директория app не найдена:', appDir)
      return []
    }

    // Получаем все маршруты
    const routes = getRoutes(appDir)
    console.log('📍 Найденные маршруты:', routes)

    // Генерируем sitemap
    const sitemapEntries: MetadataRoute.Sitemap = []

    for (const route of routes) {
      const routeConfig = getRouteConfig(route)
      const languageUrls = generateLanguageUrls(routeConfig)
      sitemapEntries.push(...languageUrls)
    }

    // Добавляем дополнительные важные URL
    const additionalUrls: MetadataRoute.Sitemap = [
      {
        url: `${BASE_URL}/sitemap.xml`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.5,
      },
      {
        url: `${BASE_URL}/robots.txt`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.3,
      }
    ]

    const finalSitemap = [...sitemapEntries, ...additionalUrls]
    
    console.log(`✅ Sitemap сгенерирован: ${finalSitemap.length} URL`)
    return finalSitemap

  } catch (error) {
    console.error('❌ Ошибка генерации sitemap:', error)
    
    // Возвращаем минимальный sitemap в случае ошибки
    return [
      {
        url: BASE_URL,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      }
    ]
  }
}
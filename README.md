# BESIDER — News Aggregator

BESIDER — это новостной агрегатор, вдохновленный Insider, реализованный на **Next.js + TypeScript + Redux Toolkit** с интеграцией New York Times API. 

Проект доступен по адресу - https://my-news-app-ruddy.vercel.app/

## Стек технологий

- Next.js — серверный рендеринг (SSR) и маршрутизация  
- TypeScript — типизация  
- Redux Toolkit — управление состоянием  
- TailwindCSS — адаптивная верстка  
- next/font — оптимизированные Google Fonts  
- next/image — оптимизация изображений  

## Функционал

- Загрузка новостей через New York Times API  
- Бесконечная прокрутка (infinite scroll)  
- Автоматическое обновление новостной ленты  
- Кэширование API-запросов через кастомный прокси-роут  
- Группировка статей по датам  
- Адаптивная Pixel Perfect верстка (Mobile First)  

## Установка и запуск

```bash
# Клонировать репозиторий
git clone https://github.com/username/besider-news.git
cd besider-news

# Установить зависимости
npm install --legacy-peer-deps

# Создать файл окружения
cp .env.local.example .env.local
# Вставить свой ключ NYT API
NYT_API_KEY=your_api_key_here

# Запустить dev-сервер
npm run dev
```

## Структура проекта
```bash
/pages
  /api/nyt.ts       # Прокси для NYT API
  /components       # Компоненты (Header, Footer, ArticlesList и т.д.)
  index.tsx         # Главная страница

/store
  newsSlice.ts      # Redux slice для новостей
  store.ts          # Конфигурация Redux Toolkit


# Besider — Новостное приложение

## Описание проекта
Besider — это мобильная версия веб-приложения для просмотра новостей, реализованная на React, Redux Toolkit и TypeScript. Приложение использует публичный REST API New York Times для получения архива новостей и поддерживает бесконечную прокрутку, автоматическое обновление новостей и адаптивную верстку для мобильных устройств.

## Функционал
- Просмотр новостей по дням, начиная с самых свежих
- Группировка новостей по дате публикации
- Бесконечная прокрутка: подгрузка новостей за предыдущие месяцы
- Автоматическое обновление списка новостей каждые 30 секунд
- Открытие оригинальной статьи New York Times по клику
- Мобильная адаптивная верстка
- Меню с категориями (демо)
- Индикатор загрузки (анимированные синие круги)

## Структура файлов
```
core-line/
├── public/                # Статические файлы
├── src/
│   ├── api/               # API-сервисы для работы с NYT
│   ├── assets/            # Изображения и иконки
│   ├── components/        # React-компоненты (Header, Footer, NewsList, NewsItem, Menu, Loader)
│   ├── hooks/             # Пользовательские хуки (reduxHooks)
│   ├── store/             # Redux store и слайсы
│   ├── types/             # Типы TypeScript
│   ├── utils/             # Вспомогательные функции (dateUtils)
│   ├── App.tsx            # Главный компонент приложения
│   ├── main.tsx           # Точка входа
│   ├── index.css          # Глобальные стили
│   └── setupTests.ts      # Настройка тестовой среды
├── package.json           # Зависимости и скрипты
├── vite.config.ts         # Конфигурация Vite
├── tsconfig*.json         # Конфигурация TypeScript
└── README.md              # Описание проекта
```

## Быстрый старт

### 1. Клонирование репозитория
```bash
git clone https://github.com/your-username/core-line.git
cd core-line
```

### 2. Установка зависимостей
```bash
npm install
```

### 3. Запуск приложения в режиме разработки
```bash
npm run dev
```

Приложение будет доступно по адресу http://localhost:5173/

### 4. Сборка для продакшена
```bash
npm run build
```

### 5. Запуск тестов
```bash
npm run test
```

## Используемые технологии
- React 19 + TypeScript
- Redux Toolkit
- Vite
- SCSS (Sass)

## Источники данных
- [New York Times Archive API](https://developer.nytimes.com/docs/archive-product/1/routes/%7Byear%7D/%7Bmonth%7D.json/get)

## Автор и лицензия
Тестовое задание для компании Core Line. Все права на дизайн принадлежат [Figma-макет](https://www.figma.com/file/sc2xxWzzgeeFgW7MgMjpYT/Besider---React-%D1%82%D0%B5%D1%81%D1%82%D0%BE%D0%B2%D0%BE%D0%B5?type=design&node-id=0-1&mode=design&t=U2Y6w3zdzS5bahWf-0).

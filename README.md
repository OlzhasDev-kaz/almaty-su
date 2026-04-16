# Сайт ГКП «Алматы Су» (статика)

Полноценная структура проекта: **корень репозитория** — инфраструктура и скрипты, **папка [`web/`](web/)** — всё, что отдаётся на хостинг (HTML, CSS, JS, иконки).

## Структура

| Путь | Назначение |
|------|------------|
| `web/*.html` | Страницы |
| `web/css/`, `web/js/`, `web/assets/` | Стили, скрипты, фавикон |
| `web/.htaccess` | Правила Apache (если нужны) |
| `tools/` | Генераторы и утилиты |
| `netlify.toml` | Деплой Netlify (`publish = "web"`) |
| `web/vercel.json` | Заголовки для Vercel (см. ниже) |

Шапка, верхняя полоса и подвал подставляются скриптом [`web/js/chrome.js`](web/js/chrome.js) в каждую страницу; меню берётся из [`web/js/nav-data.js`](web/js/nav-data.js).

## Команды

Требуется **Node.js 18+**.

```bash
npm run dev
```

Откроется статический сервер на порту **3330** с корнем `web/`.

```bash
$env:ADMIN_TOKEN="change-me"
npm run server
```

Запускает сайт с API на том же порту (`/api/feedback`, `/api/site-settings`, `/api/admin/site-settings`).
`/admin.html` доступна только с корректным токеном и позволяет включать траурный ч/б режим и редактировать верхнюю баннер-карусель.
Контент главной (новости/объявления) отдается через `/api/content/home` из `data/home-content.json`.
Для админки доступны также `/api/admin/content/home` (чтение/сохранение контента главной).
В `data/home-content.json` теперь также хранятся `heroSlides` для главной карусели (редактируются из админки).
Там же управляются `govBanner` и `services` для главной страницы.
Контент страниц `novosti.html` и `protivodeystvie-korrupcii.html` отдается через `/api/content/pages` из `data/pages-content.json`, админ-доступ: `/api/admin/content/pages`.
В админке для этих страниц доступен визуальный CRUD (лента новостей, архив, контакты, документы) без ручного JSON.

```bash
npm run render:meters
```

Пересобирает страницу «Все о счётчиках» (`web/o-shetchikah.html`) из данных в `tools/render-meters-page.mjs`.

```bash
npm run scaffold
```

**Осторожно:** включает генерацию заглушек из `tools/gen-pages.mjs` и **перезаписывает** HTML-файлы, не входящие в список «ручных» в том скрипте. Используйте только если осознанно восстанавливаете шаблоны.

```bash
npm run pack
```

Собирает `almatysu-site.zip` для загрузки на обычный хостинг (содержимое как у `web/`).

## Деплой

- **Netlify:** репозиторий подключается как есть; в `netlify.toml` уже указано `publish = "web"`.
- **Vercel:** в настройках проекта укажите **Root Directory** = `web` (там лежит `vercel.json`).
- **GitHub Pages:** workflow [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) выкладывает **содержимое** `web/` как корень сайта (адрес вида `https://<user>.github.io/<repo>/`, без лишнего сегмента `/web/`). В разметке и в [`web/js/nav-data.js`](web/js/nav-data.js) уже используются **относительные** пути (`css/…`, `js/…`, `assets/…`, `*.html`), без ведущего `/` — так страницы и ресурсы корректно открываются и на project pages с префиксом репозитория. Не добавляйте ссылки вида `/css/style.css` и не задавайте `<base href>` без необходимости: это ломает навигацию по якорям и вложенным страницам.
- **FTP:** залейте **содержимое** папки `web/` в `public_html` (или используйте `npm run pack`).

## Прочее

Папка `site/` в корне (если есть) — посторонний артефакт Next.js; в `.gitignore` игнорируется, её можно удалить вручную.

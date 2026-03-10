import Database from 'better-sqlite3';

const db = new Database('content.db');

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS site_content (
    id TEXT PRIMARY KEY,
    data TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS sections (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    order_index INTEGER NOT NULL,
    visible INTEGER DEFAULT 1
  );
`);

// Initial content if not exists
const initialContent = {
  hero: {
    title: "Цифровое будущее с Robitai Nav",
    subtitle: "Предоставляем премиальный контент и технологические решения для масштабирования вашего бизнеса. Надежность, инновации и результат.",
    badge: "Лидер рынка Узбекистана и Таджикистана"
  },
  features: [
    { id: '1', icon: 'Rocket', title: 'Быстрый запуск', desc: 'Интеграция наших сервисов занимает считанные часы, позволяя вам сразу начать зарабатывать.' },
    { id: '2', icon: 'BarChart3', title: 'Глубокая аналитика', desc: 'Детальные отчеты и статистика в реальном времени для принятия верных бизнес-решений.' },
    { id: '3', icon: 'Shield', title: 'Безопасность', desc: 'Защита данных на уровне мировых стандартов. Ваша информация и информация клиентов в безопасности.' }
  ],
  pricing: [
    { id: '1', name: 'Старт', price: 49, features: ['Базовый контент', 'Аналитика (Базовая)', 'Email поддержка'] },
    { id: '2', name: 'Бизнес', price: 99, popular: true, features: ['Все из Старт', 'Расширенная аналитика', 'Приоритетная поддержка', 'API доступ'] },
    { id: '3', name: 'Корпоративный', price: 299, features: ['Эксклюзивный контент', 'Персональный менеджер', 'SLA гарантии'] }
  ]
};

const checkContent = db.prepare('SELECT count(*) as count FROM site_content').get() as { count: number };
if (checkContent.count === 0) {
  db.prepare('INSERT INTO site_content (id, data) VALUES (?, ?)').run('main', JSON.stringify(initialContent));
  
  const sections = ['hero', 'partners', 'features', 'stats', 'process', 'testimonials', 'pricing', 'faq', 'cta'];
  const insertSection = db.prepare('INSERT INTO sections (id, name, order_index) VALUES (?, ?, ?)');
  sections.forEach((s, i) => insertSection.run(s, s, i));
}

export default db;

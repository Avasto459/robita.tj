import express from "express";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("site.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS config (
    id INTEGER PRIMARY KEY,
    key TEXT UNIQUE,
    value TEXT
  );
`);

// Check if config exists, otherwise insert default
const existingConfig = db.prepare("SELECT value FROM config WHERE key = 'site_config'").get();
if (!existingConfig) {
  const defaultConfig = {
    tawkId: "69a6eb2624cf1b1c3d96702f/1jiq0d3kp",
    hero: {
      title: { 
        ru: "Ваш надежный партнер в мире VAS и цифрового контента", 
        uz: "VAS va raqamli kontent dunyosidagi ishonchli hamkoringiz", 
        en: "Your Reliable Partner in the World of VAS and Digital Content",
        tj: "Шарики боэътимоди шумо дар ҷаҳони VAS ва мундариҷаи рақамӣ"
      },
      subtitle: { 
        ru: "Robitai Nav — ведущий агрегатор и поставщик инновационных решений для мобильных операторов в Центральной Азии. Мы превращаем трафик в доход.", 
        uz: "Robitai Nav — Markaziy Osiyodagi mobil operatorlar uchun innovatsion yechimlarning yetakchi agregatori va yetkazib beruvchisi. Biz trafikni daromadga aylantiramiz.", 
        en: "Robitai Nav is a leading aggregator and provider of innovative solutions for mobile operators in Central Asia. We turn traffic into revenue.",
        tj: "Robitai Nav — агрегатори пешбар ва таъминкунандаи қарорҳои инноватсионӣ барои операторони мобилӣ дар Осиёи Марказӣ. Мо трафикро ба даромад табдил медиҳем."
      },
      cta: { ru: "Связаться с нами", uz: "Biz bilan bog'lanish", en: "Contact Us", tj: "Бо мо тамос гиред" },
      cardTitle: { ru: "Цифровые решения", uz: "Raqamli yechimlar", en: "Digital Solutions", tj: "Ҳалли рақамӣ" },
      cardSubtitle: { ru: "Трансформируем ваш бизнес с помощью инновационных технологий", uz: "Biznesingizni innovatsion texnologiyalar bilan o'zgartiramiz", en: "Transforming your business with innovative technologies", tj: "Табдили тиҷорати шумо бо технологияҳои инноватсионӣ" },
      features: [
        { icon: 'rocket', label: { ru: "Быстрая интеграция", uz: "Tez integratsiya", en: "Fast Integration", tj: "Интегратсияи зуд" } },
        { icon: 'chart', label: { ru: "Глубокая аналитика", uz: "Chuqur tahlil", en: "Deep Analytics", tj: "Таҳлили чуқур" } },
        { icon: 'zap', label: { ru: "Масштабируемость", uz: "Masshtablash", en: "Scalability", tj: "Масштабнокунӣ" } }
      ]
    },
    ctaSection: {
      title: { 
        ru: "Готовы масштабировать свой бизнес?", 
        uz: "Biznesingizni kengaytirishga tayyormisiz?", 
        en: "Ready to scale your business?",
        tj: "Барои васеъ кардани тиҷорати худ омодаед?"
      },
      subtitle: { 
        ru: "Подпишитесь на нашу рассылку, чтобы получить демо-доступ и эксклюзивные условия сотрудничества.", 
        uz: "Demo-kirish va hamkorlikning eksklyuziv shartlarini olish uchun xabarnomamizga obuna bo'ling.", 
        en: "Subscribe to our newsletter to get demo access and exclusive terms of cooperation.",
        tj: "Ба бюллетени мо обуна шавед, то дастрасии демо ва шартҳои истисноии ҳамкориро ба даст оред."
      },
      buttonText: { ru: "Подписаться", uz: "Obuna bo'lish", en: "Subscribe", tj: "Обуна шудан" }
    },
    layout: [
      "Hero", "Partners", "Features", "Stats", "Process", "Testimonials", "Pricing", "Team", "FAQ", "Blog", "CTA"
    ],
    partners: [
      { id: 1, name: "UZTELECOM" },
      { id: 2, name: "BEELINE UZBEKISTAN" },
      { id: 3, name: "UCELL" },
      { id: 4, name: "MOBIUZ" },
      { id: 5, name: "TCELL" },
      { id: 6, name: "MEGAFON TADJIKISTAN" },
      { id: 7, name: "BABILON-M" },
      { id: 8, name: "ZET-MOBILE" }
    ]
  };
  
  db.prepare("INSERT INTO config (key, value) VALUES (?, ?)").run('site_config', JSON.stringify(defaultConfig));
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/config", (req, res) => {
    try {
      const config = db.prepare("SELECT value FROM config WHERE key = 'site_config'").get();
      if (!config) {
        return res.status(404).json({ error: 'Config not found' });
      }
      res.json(JSON.parse(config.value));
    } catch (err) {
      console.error('Error fetching config:', err);
      res.status(500).json({ error: 'Failed to fetch config' });
    }
  });

  app.post("/api/config", (req, res) => {
    try {
      const newConfig = req.body;
      
      // Validate that config exists
      const existing = db.prepare("SELECT id FROM config WHERE key = 'site_config'").get();
      
      if (existing) {
        // Update existing config
        db.prepare("UPDATE config SET value = ? WHERE key = 'site_config'").run(JSON.stringify(newConfig));
        console.log('✅ Config updated successfully');
      } else {
        // Insert new config if it doesn't exist
        db.prepare("INSERT INTO config (key, value) VALUES (?, ?)").run('site_config', JSON.stringify(newConfig));
        console.log('✅ Config created successfully');
      }
      
      res.json({ success: true, message: 'Config saved' });
    } catch (err) {
      console.error('❌ Error saving config:', err);
      res.status(500).json({ error: 'Failed to save config', details: err.message });
    }
  });

  // AI-powered icon suggestion endpoint
  app.post("/api/ai-suggest-icon", express.json(), async (req, res) => {
    try {
      const { title, description } = req.body;
      
      if (!title) {
        return res.status(400).json({ error: 'Title is required' });
      }

      // Map keywords to Material Icons
      const iconMapping = {
        // Technology & Integration
        'интеграц': 'integration_instructions',
        'integratsiya': 'integration_instructions',
        'api': 'api',
        'sdk': 'code',
        'биллинг': 'account_balance',
        'billing': 'account_balance',
        'систем': 'hub',
        'system': 'hub',
        
        // Analytics & Data
        'аналитик': 'analytics',
        'analitika': 'analytics',
        'данны': 'storage',
        'data': 'storage',
        'статистик': 'bar_chart',
        'statistika': 'bar_chart',
        'отчет': 'assessment',
        'report': 'assessment',
        'график': 'trending_up',
        'chart': 'trending_up',
        
        // Security & Protection
        'безопасн': 'security',
        'bezopasnost': 'security',
        'защит': 'shield',
        'zashchita': 'shield',
        'secure': 'security',
        'protection': 'shield',
        'privacy': 'lock',
        
        // Speed & Performance
        'быстр': 'speed',
        'tez': 'speed',
        'fast': 'speed',
        'скорост': 'rocket_launch',
        'speed': 'rocket_launch',
        'производит': 'performance',
        'performance': 'performance',
        'оптимиз': 'optimize',
        
        // Scale & Growth
        'масштаб': 'scale',
        'masshtab': 'scale',
        'scale': 'scale',
        'рост': 'trending_up',
        'growth': 'trending_up',
        'расшир': 'expand',
        'expand': 'expand',
        
        // Cloud & Storage
        'облак': 'cloud',
        'oblak': 'cloud',
        'cloud': 'cloud',
        'хранен': 'folder',
        'storage': 'folder',
        'сервер': 'dns',
        'server': 'dns',
        
        // Support & Service
        'поддержк': 'support_agent',
        'podderzhka': 'support_agent',
        'support': 'support_agent',
        'помощ': 'help',
        'help': 'help',
        'сервис': 'room_service',
        'service': 'room_service',
        'клиент': 'people',
        'client': 'people',
        
        // Innovation & Ideas
        'инновац': 'lightbulb',
        'innovatsiya': 'lightbulb',
        'innovation': 'lightbulb',
        'креатив': 'psychology',
        'creative': 'psychology',
        'иде': 'emoji_objects',
        'idea': 'emoji_objects',
        'решени': 'engineering',
        'solution': 'engineering',
        
        // Network & Connection
        'сет': 'network_check',
        'set': 'network_check',
        'network': 'network_check',
        'соедин': 'link',
        'connection': 'link',
        'мобильн': 'smartphone',
        'mobile': 'smartphone',
        'оператор': 'cell_tower',
        'operator': 'cell_tower',
        
        // Payment & Money
        'платеж': 'payments',
        'to\'lov': 'payments',
        'payment': 'payments',
        'деньг': 'attach_money',
        'money': 'attach_money',
        'финанс': 'finance',
        'finance': 'finance',
        'доход': 'paid',
        'revenue': 'paid',
        
        // Content & Media
        'контент': 'article',
        'kontent': 'article',
        'content': 'article',
        'видео': 'videocam',
        'video': 'videocam',
        'музык': 'music_note',
        'music': 'music_note',
        'медиа': 'media',
        'media': 'media',
        
        // General Business
        'бизнес': 'business',
        'biznes': 'business',
        'business': 'business',
        'компани': 'corporate',
        'company': 'corporate',
        'предприяти': 'business_center',
        'enterprise': 'business_center',
        'управлен': 'management',
        'management': 'management',
        'стратег': 'strategy',
        'strategy': 'strategy'
      };

      // Search for matching icons based on keywords
      const searchText = (title + ' ' + (description || '')).toLowerCase();
      let suggestedIcon = null;
      
      for (const [keyword, icon] of Object.entries(iconMapping)) {
        if (searchText.includes(keyword)) {
          suggestedIcon = icon;
          break;
        }
      }
      
      // Default icon if no match found
      if (!suggestedIcon) {
        suggestedIcon = 'rocket_launch'; // Default innovative icon
      }
      
      console.log(`🤖 AI Suggestion: "${title}" -> ${suggestedIcon}`);
      res.json({ icon: suggestedIcon });
      
    } catch (err) {
      console.error('❌ AI suggestion error:', err);
      res.status(500).json({ error: 'Failed to suggest icon', details: err.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

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

// Default configuration with translations
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
    cta: { ru: "Связаться с нами", uz: "Biz bilan bog'lanish", en: "Contact Us", tj: "Бо мо тамос гиред" }
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
  ],
  features: [
    { 
      id: 1, 
      title: { ru: "VAS-сервисы", uz: "VAS xizmatlari", en: "VAS Services" }, 
      desc: { ru: "Широкий спектр дополнительных услуг для мобильных операторов: от развлекательного контента до полезных утилит.", uz: "Mobil operatorlar uchun ko'ngilochar kontentdan tortib foydali utilitalargacha bo'lgan qo'shimcha xizmatlarning keng doirasi.", en: "A wide range of value-added services for mobile operators: from entertainment content to useful utilities." } 
    },
    { 
      id: 2, 
      title: { ru: "Прямой биллинг (DCB)", uz: "To'g'ridan-to'g'ri billing (DCB)", en: "Direct Carrier Billing (DCB)" }, 
      desc: { ru: "Удобная оплата услуг со счета мобильного телефона для миллионов пользователей в регионе.", uz: "Mintaqadagi millionlab foydalanuvchilar uchun mobil telefon hisobidan xizmatlar uchun qulay to'lov.", en: "Convenient payment for services from a mobile phone account for millions of users in the region." } 
    },
    { 
      id: 3, 
      title: { ru: "Локализация контента", uz: "Kontentni mahalliylashtirish", en: "Content Localization" }, 
      desc: { ru: "Адаптация мирового контента под культурные и языковые особенности рынков Узбекистана и Таджикистана.", uz: "Jahon kontentini O'zbekiston va Tojikiston bozorlarining madaniy va lisoniy xususiyatlariga moslashtirish.", en: "Adaptation of world content to the cultural and linguistic characteristics of the Uzbek and Tajik markets." } 
    },
    { 
      id: 4, 
      title: { ru: "Техническая поддержка 24/7", uz: "Texnik ko'mak 24/7", en: "Technical Support 24/7" }, 
      desc: { ru: "Круглосуточный мониторинг и оперативное решение любых технических вопросов в режиме реального времени.", uz: "Sutka davomida monitoring va har qanday texnik masalalarni real vaqt rejimida tezkor hal qilish.", en: "Round-the-clock monitoring and prompt resolution of any technical issues in real time." } 
    },
    { 
      id: 5, 
      title: { ru: "Маркетинговая аналитика", uz: "Marketing tahlili", en: "Marketing Analytics" }, 
      desc: { ru: "Глубокий анализ поведения пользователей и оптимизация конверсии для максимизации вашего дохода.", uz: "Foydalanuvchilar xatti-harakatlarini chuqur tahlil qilish va daromadingizni oshirish uchun konversiyani optimallashtirish.", en: "In-depth analysis of user behavior and conversion optimization to maximize your revenue." } 
    },
    { 
      id: 6, 
      title: { ru: "Облачные решения", uz: "Bulutli yechimlar", en: "Cloud Solutions" }, 
      desc: { ru: "Масштабируемая инфраструктура для хранения и доставки контента с минимальной задержкой.", uz: "Kontentni saqlash va minimal kechikish bilan yetkazib berish uchun kengaytiriladigan infratuzilma.", en: "Scalable infrastructure for content storage and delivery with minimal latency." } 
    },
    { 
      id: 7, 
      title: { ru: "SMS-агрегация", uz: "SMS agregatsiyasi", en: "SMS Aggregation" }, 
      desc: { ru: "Надежная платформа для массовых рассылок и уведомлений с высоким процентом доставки.", uz: "Yuqori yetkazib berish foiziga ega ommaviy xabarnomalar va bildirishnomalar uchun ishonchli platforma.", en: "Reliable platform for bulk messaging and notifications with a high delivery rate." } 
    },
    { 
      id: 8, 
      title: { ru: "Мобильные игры", uz: "Mobil o'yinlar", en: "Mobile Games" }, 
      desc: { ru: "Каталог популярных HTML5 и нативных игр, адаптированных для всех типов мобильных устройств.", uz: "Barcha turdagi mobil qurilmalar uchun moslashtirilgan mashhur HTML5 va mahalliy o'yinlar katalogi.", en: "A catalog of popular HTML5 and native games adapted for all types of mobile devices." } 
    },
    { 
      id: 9, 
      title: { ru: "Видео-стриминг", uz: "Video striming", en: "Video Streaming" }, 
      desc: { ru: "Платформа для трансляции лицензионного видеоконтента в высоком качестве (HD/4K).", uz: "Yuqori sifatli (HD/4K) litsenziyalangan video kontentni translyatsiya qilish platformasi.", en: "Platform for broadcasting licensed video content in high quality (HD/4K)." } 
    }
  ],
  stats: [
    { id: 1, value: "10+", label: { ru: "Лет опыта", uz: "Yillik tajriba", en: "Years of Experience" } },
    { id: 2, value: "50M+", label: { ru: "Пользователей", uz: "Foydalanuvchilar", en: "Users" } },
    { id: 3, value: "24/7", label: { ru: "Поддержка", uz: "Qo'llab-quvvatlash", en: "Support" } },
    { id: 4, value: "99%", label: { ru: "Uptime", uz: "Uptime", en: "Uptime" } }
  ],
  process: [
    { 
      id: 1, 
      num: "1", 
      title: { ru: "Заявка", uz: "Ariza", en: "Application" }, 
      desc: { ru: "Оставьте заявку на сайте, и наш менеджер свяжется с вами для уточнения деталей.", uz: "Saytda ariza qoldiring va bizning menejerimiz tafsilotlarni aniqlashtirish uchun siz bilan bog'lanadi.", en: "Leave an application on the site, and our manager will contact you to clarify details." } 
    },
    { 
      id: 2, 
      num: "2", 
      title: { ru: "Интеграция", uz: "Integratsiya", en: "Integration" }, 
      desc: { ru: "Техническая настройка и интеграция сервисов под ваши нужды.", uz: "Sizning ehtiyojlaringiz uchun xizmatlarni texnik sozlash va integratsiya qilish.", en: "Technical setup and integration of services for your needs." } 
    },
    { 
      id: 3, 
      num: "3", 
      title: { ru: "Запуск", uz: "Ishga tushirish", en: "Launch" }, 
      desc: { ru: "Старт проекта, мониторинг показателей и масштабирование.", uz: "Loyihani boshlash, ko'rsatkichlarni monitoring qilish va kengaytirish.", en: "Project start, performance monitoring and scaling." } 
    },
    { 
      id: 4, 
      num: "4", 
      title: { ru: "Монетизация", uz: "Monetizatsiya", en: "Monetization" }, 
      desc: { ru: "Оптимизация доходности и управление биллингом для стабильного роста прибыли.", uz: "Daromadlilikni optimallashtirish va foydaning barqaror o'sishi uchun billingni boshqarish.", en: "Profitability optimization and billing management for stable profit growth." } 
    },
    { 
      id: 5, 
      num: "5", 
      title: { ru: "Поддержка", uz: "Qo'llab-quvvatlash", en: "Support" }, 
      desc: { ru: "Постоянное обновление контента и техническое сопровождение 24/7.", uz: "Kontentni doimiy yangilab borish va 24/7 texnik kuzatuv.", en: "Constant content updates and 24/7 technical support." } 
    }
  ],
  testimonials: [
    { 
      id: 1, 
      name: "Алишер Кадыров", 
      role: { ru: "Директор по маркетингу, UzTelecom", uz: "Marketing direktori, UzTelecom", en: "Marketing Director, UzTelecom" }, 
      content: { ru: "Robitai Nav — надежный партнер, который помог нам запустить десятки успешных VAS-проектов. Их экспертиза на рынке Узбекистана неоценима.", uz: "Robitai Nav — bizga o'nlab muvaffaqiyatli VAS loyihalarini ishga tushirishda yordam bergan ishonchli hamkor. Ularning O'zbekiston bozoridagi ekspertizasi bebahodir.", en: "Robitai Nav is a reliable partner who helped us launch dozens of successful VAS projects. Their expertise in the Uzbek market is invaluable." }, 
      img: "https://picsum.photos/seed/t1/100/100" 
    },
    { 
      id: 2, 
      name: "Елена Смирнова", 
      role: { ru: "Руководитель контент-отдела, Beeline", uz: "Kontent bo'limi rahbari, Beeline", en: "Head of Content, Beeline" }, 
      content: { ru: "Профессионализм команды и качество контента всегда на высшем уровне. Мы ценим их гибкость и скорость работы.", uz: "Jamoaning professionalligi va kontent sifati har doim yuqori darajada. Biz ularning moslashuvchanligi va ish tezligini qadrlaymiz.", en: "The professionalism of the team and the quality of the content are always at the highest level. We value their flexibility and speed of work." }, 
      img: "https://picsum.photos/seed/t2/100/100" 
    },
    { 
      id: 3, 
      name: "Джамшед Рахимов", 
      role: { ru: "CTO, Tcell", uz: "CTO, Tcell", en: "CTO, Tcell" }, 
      content: { ru: "Интеграция прошла гладко благодаря отличной технической документации и поддержке Robitai Nav. Рекомендую!", uz: "Robitai Nav-ning ajoyib texnik hujjatlari va qo'llab-quvvatlashi tufayli integratsiya muammosiz o'tdi. Tavsiya qilaman!", en: "The integration went smoothly thanks to Robitai Nav's excellent technical documentation and support. I recommend them!" }, 
      img: "https://picsum.photos/seed/t3/100/100" 
    },
    { 
      id: 4, 
      name: "Музаффар Хакимов", 
      role: { ru: "Product Owner, Mobiuz", uz: "Mahsulot egasi, Mobiuz", en: "Product Owner, Mobiuz" }, 
      content: { ru: "Мы работаем с Robitai Nav уже более 5 лет. Это команда, которая всегда идет навстречу и предлагает лучшие решения.", uz: "Biz Robitai Nav bilan 5 yildan ortiq vaqtdan beri ishlaymiz. Bu har doim yordamga tayyor va eng yaxshi yechimlarni taklif qiladigan jamoa.", en: "We have been working with Robitai Nav for over 5 years. This is a team that always meets us halfway and offers the best solutions." }, 
      img: "https://picsum.photos/seed/t4/100/100" 
    }
  ],
  pricing: [
    { 
      id: 1, 
      name: { ru: "Стартап", uz: "Startap", en: "Startup" }, 
      price: "499", 
      period: { ru: "мес", uz: "oy", en: "mo" }, 
      features: [
        { ru: "Базовая интеграция", uz: "Asosiy integratsiya", en: "Basic Integration" },
        { ru: "До 5 сервисов", uz: "5 tagacha xizmat", en: "Up to 5 services" },
        { ru: "Стандартная поддержка", uz: "Standart qo'llab-quvvatlash", en: "Standard Support" },
        { ru: "Аналитика раз в месяц", uz: "Oyda bir marta tahlil", en: "Monthly Analytics" }
      ] 
    },
    { 
      id: 2, 
      name: { ru: "Бизнес", uz: "Biznes", en: "Business" }, 
      price: "1499", 
      period: { ru: "мес", uz: "oy", en: "mo" }, 
      isPopular: true,
      features: [
        { ru: "Полная интеграция", uz: "To'liq integratsiya", en: "Full Integration" },
        { ru: "Неограниченно сервисов", uz: "Cheksiz xizmatlar", en: "Unlimited services" },
        { ru: "Приоритетная поддержка 24/7", uz: "24/7 ustuvor qo'llab-quvvatlash", en: "Priority 24/7 Support" },
        { ru: "Маркетинговое продвижение", uz: "Marketing targ'iboti", en: "Marketing Promotion" },
        { ru: "Еженедельные отчеты", uz: "Haftalik hisobotlar", en: "Weekly Reports" }
      ] 
    },
    { 
      id: 3, 
      name: { ru: "Enterprise", uz: "Enterprise", en: "Enterprise" }, 
      price: "Индивид.", 
      period: { ru: "мес", uz: "oy", en: "mo" }, 
      features: [
        { ru: "Персональный менеджер", uz: "Shaxsiy menejer", en: "Personal Manager" },
        { ru: "Кастомная разработка", uz: "Maxsus ishlab chiqish", en: "Custom Development" },
        { ru: "SLA 99.99%", uz: "SLA 99.99%", en: "SLA 99.99%" },
        { ru: "White-label решения", uz: "White-label yechimlar", en: "White-label Solutions" }
      ] 
    }
  ],
  team: [
    { id: 1, name: "Фаррух Каримов", role: { ru: "Founder & CEO", uz: "Asoschi va CEO", en: "Founder & CEO" }, img: "https://picsum.photos/seed/m1/400/400", telegram: "@farrux", whatsapp: "+998901234567" },
    { id: 2, name: "Дильшод Махмудов", role: { ru: "CTO", uz: "CTO", en: "CTO" }, img: "https://picsum.photos/seed/m2/400/400", telegram: "@dilshod_tech", whatsapp: "+998907654321" },
    { id: 3, name: "Нигора Саидова", role: { ru: "Head of Content", uz: "Kontent bo'limi rahbari", en: "Head of Content" }, img: "https://picsum.photos/seed/m3/400/400", telegram: "@nigora_content", whatsapp: "+998901112233" },
    { id: 4, name: "Акмаль Расулов", role: { ru: "Head of Sales", uz: "Sotuv bo'limi rahbari", en: "Head of Sales" }, img: "https://picsum.photos/seed/m4/400/400", telegram: "@akmal_sales", whatsapp: "+998904445566" },
    { id: 5, name: "Сабина Алиева", role: { ru: "Marketing Manager", uz: "Marketing menejeri", en: "Marketing Manager" }, img: "https://picsum.photos/seed/m5/400/400", telegram: "@sabina_mkt", whatsapp: "+998905556677" },
    { id: 6, name: "Тимур Ибрагимов", role: { ru: "Account Manager", uz: "Akkaunt menejeri", en: "Account Manager" }, img: "https://picsum.photos/seed/m6/400/400", telegram: "@timur_acc", whatsapp: "+998906667788" }
  ],
  faq: [
    { 
      id: 1, 
      question: { ru: "Какие страны вы покрываете?", uz: "Qaysi davlatlarni qamrab olasiz?", en: "Which countries do you cover?" }, 
      answer: { ru: "В данный момент мы активно работаем в Узбекистане и Таджикистане, планируя расширение в другие страны СНГ (Казахстан, Кыргызстан).", uz: "Hozirda biz O'zbekiston va Tojikistonda faol ishlayapmiz, boshqa MDH davlatlariga (Qozog'iston, Qirg'iziston) kengayishni rejalashtirmoqdamiz.", en: "Currently, we are actively working in Uzbekistan and Tajikistan, planning expansion to other CIS countries (Kazakhstan, Kyrgyzstan)." } 
    },
    { 
      id: 2, 
      question: { ru: "Как происходит интеграция?", uz: "Integratsiya qanday amalga oshiriladi?", en: "How does integration work?" }, 
      answer: { ru: "Мы предоставляем готовые API и SDK для быстрой интеграции с вашими системами биллинга. Весь процесс занимает от 2 до 4 недель.", uz: "Billing tizimlaringiz bilan tezkor integratsiya qilish uchun tayyor API va SDK taqdim etamiz. Butun jarayon 2 haftadan 4 haftagacha davom etadi.", en: "We provide ready-made APIs and SDKs for fast integration with your billing systems. The entire process takes from 2 to 4 weeks." } 
    },
    { 
      id: 3, 
      question: { ru: "Какие типы контента вы предоставляете?", uz: "Qanday turdagi kontentlarni taqdim etasiz?", en: "What types of content do you provide?" }, 
      answer: { ru: "Мы работаем с видео, музыкой, играми, образовательным контентом и информационными сервисами (гороскопы, новости, погода).", uz: "Biz video, musiqa, o'yinlar, ta'lim kontenti va axborot xizmatlari (munajjimlar bashorati, yangiliklar, ob-havo) bilan ishlaymiz.", en: "We work with video, music, games, educational content, and information services (horoscopes, news, weather)." } 
    }
  ],
  blog: [
    { id: 1, title: { ru: "Будущее VAS-услуг в 2024 году", uz: "2024 yilda VAS xizmatlari kelajagi", en: "Future of VAS Services in 2024" }, date: "12.03.2024", category: { ru: "Аналитика", uz: "Tahlil", en: "Analytics" }, img: "https://picsum.photos/seed/b1/600/400" },
    { id: 2, title: { ru: "Как увеличить ARPU мобильного оператора", uz: "Mobil operator ARPU-ni qanday oshirish mumkin", en: "How to Increase Mobile Operator ARPU" }, date: "05.04.2024", category: { ru: "Бизнес", uz: "Biznes", en: "Business" }, img: "https://picsum.photos/seed/b2/600/400" },
    { id: 3, title: { ru: "Преимущества Direct Carrier Billing", uz: "Direct Carrier Billing-ning afzalliklari", en: "Advantages of Direct Carrier Billing" }, date: "20.05.2024", category: { ru: "Технологии", uz: "Texnologiyalar", en: "Technology" }, img: "https://picsum.photos/seed/b3/600/400" }
  ],
  footer: {
    address: { ru: "ул. Истиклол, 15, Ташкент / Душанбе", uz: "Istiqlol ko'chasi, 15, Toshkent / Dushanbe", en: "15 Istiklol St, Tashkent / Dushanbe", tj: "кӯчаи Истиқлол, 15, Тошканд / Душанбе" },
    email: "tickets@robitai-nav.p.tawk.email",
    phone: "+998 71 000 00 00",
    helpCenter: "https://robitainav.tawk.help"
  }
};

// Seed initial data if empty or reset if structure changed significantly
const existing = db.prepare("SELECT * FROM config WHERE key = 'site_config'").get();
if (!existing) {
  db.prepare("INSERT INTO config (key, value) VALUES (?, ?)").run("site_config", JSON.stringify(defaultConfig));
} else {
  // Optional: Update logic if schema changes drastically
  // For this demo, we'll overwrite to ensure the new structure is used
  db.prepare("UPDATE config SET value = ? WHERE key = 'site_config'").run(JSON.stringify(defaultConfig));
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/config", (req, res) => {
    const config = db.prepare("SELECT value FROM config WHERE key = 'site_config'").get();
    res.json(JSON.parse(config.value));
  });

  app.post("/api/config", (req, res) => {
    const newConfig = req.body;
    db.prepare("UPDATE config SET value = ? WHERE key = 'site_config'").run(JSON.stringify(newConfig));
    res.json({ success: true });
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

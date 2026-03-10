import React, { useState, useEffect } from 'react';
import { motion, Reorder, AnimatePresence } from 'framer-motion';
import { 
  Save, Trash2, Plus, GripVertical, 
  Layout, Users, FileText, Settings, 
  ArrowLeft, LogOut, Check, Globe,
  Shield, Rocket, BarChart3, MessageSquare,
  CreditCard, HelpCircle, Phone, MapPin,
  Send, MessageCircle, MousePointerClick,
  Lock, User
} from 'lucide-react';
import { SiteConfig, Translation, Language } from './types';

const TranslationInput = ({ 
  label, 
  value = { ru: '', uz: '', en: '', tj: '' }, 
  onChange, 
  isTextArea = false 
}: { 
  label: string, 
  value: Translation, 
  onChange: (val: Translation) => void,
  isTextArea?: boolean
}) => {
  const [lang, setLang] = useState<Language>('ru');

  const handleChange = (text: string) => {
    onChange({ ...value, [lang]: text });
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-xs font-black uppercase tracking-widest text-gray-400">{label}</label>
        <div className="flex gap-1 bg-gray-100 dark:bg-white/5 p-1 rounded-lg">
          {(['ru', 'uz', 'en', 'tj'] as Language[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`text-[10px] font-black px-2 py-1 rounded-md transition-all ${lang === l ? 'bg-primary text-white shadow-sm' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'}`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
      {isTextArea ? (
        <textarea 
          value={value?.[lang] || ''}
          onChange={(e) => handleChange(e.target.value)}
          className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl p-4 outline-none focus:ring-2 ring-primary h-32 transition-all"
        />
      ) : (
        <input 
          type="text" 
          value={value?.[lang] || ''}
          onChange={(e) => handleChange(e.target.value)}
          className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl p-4 outline-none focus:ring-2 ring-primary transition-all"
        />
      )}
    </div>
  );
};

const Admin = ({ config, onSave }: { config: SiteConfig, onSave: (newConfig: SiteConfig) => void }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('layout');
  const [localConfig, setLocalConfig] = useState<SiteConfig>(config);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Auto-save functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      if (hasUnsavedChanges && isAuthenticated) {
        console.log('🔄 Auto-saving changes...');
        handleSave();
      }
    }, 2000); // Auto-save after 2 seconds of inactivity

    return () => clearTimeout(timer);
  }, [localConfig, hasUnsavedChanges, isAuthenticated]);

  useEffect(() => {
    setLocalConfig(config);
  }, [config]);

  // Warn before leaving with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
        return '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(localConfig)
      });
      if (res.ok) {
        onSave(localConfig);
        setShowSuccess(true);
        setHasUnsavedChanges(false); // Reset unsaved changes flag
        setTimeout(() => setShowSuccess(false), 3000);
        console.log('✅ Config saved successfully');
      } else {
        throw new Error('Failed to save');
      }
    } catch (err) {
      console.error('❌ Save error:', err);
      alert('Error saving changes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const updateLayout = (newLayout: string[]) => {
    setLocalConfig({ ...localConfig, layout: newLayout });
    setHasUnsavedChanges(true);
  };

  const updateHero = (field: string, value: any) => {
    setLocalConfig({
      ...localConfig,
      hero: { ...localConfig.hero, [field]: value }
    });
    setHasUnsavedChanges(true);
  };

  const updateFooter = (field: string, value: any) => {
    setLocalConfig({
      ...localConfig,
      footer: { ...localConfig.footer, [field]: value }
    });
    setHasUnsavedChanges(true);
  };

  const addItem = (type: keyof SiteConfig) => {
    const emptyTrans = { ru: '', uz: '', en: '', tj: '' };
    let newItem: any = { id: Date.now() };

    if (type === 'partners') newItem = { ...newItem, name: 'New Partner' };
    if (type === 'features') newItem = { ...newItem, title: { ...emptyTrans, ru: 'Новое преимущество' }, desc: emptyTrans };
    if (type === 'stats') newItem = { ...newItem, value: '0', label: emptyTrans };
    if (type === 'process') newItem = { ...newItem, num: '1', title: emptyTrans, desc: emptyTrans };
    if (type === 'testimonials') newItem = { ...newItem, name: 'Name', role: emptyTrans, content: emptyTrans, img: 'https://picsum.photos/seed/t/100/100' };
    if (type === 'pricing') newItem = { ...newItem, name: emptyTrans, price: '0', period: emptyTrans, features: [emptyTrans] };
    if (type === 'team') newItem = { ...newItem, name: 'Name', role: emptyTrans, img: 'https://picsum.photos/seed/m/400/400', telegram: '', whatsapp: '' };
    if (type === 'faq') newItem = { ...newItem, question: emptyTrans, answer: emptyTrans };
    if (type === 'blog') newItem = { ...newItem, title: emptyTrans, date: '01.01.2024', category: emptyTrans, img: 'https://picsum.photos/seed/b/600/400' };

    setLocalConfig({
      ...localConfig,
      [type]: [...(localConfig[type] as any[]), newItem]
    });
    setHasUnsavedChanges(true);
  };

  const removeItem = (type: keyof SiteConfig, id: number) => {
    setLocalConfig({
      ...localConfig,
      [type]: (localConfig[type] as any[]).filter((item: any) => item.id !== id)
    });
    setHasUnsavedChanges(true);
  };

  const updateItem = (type: keyof SiteConfig, id: number, field: string, value: any) => {
    setLocalConfig({
      ...localConfig,
      [type]: (localConfig[type] as any[]).map((item: any) => 
        item.id === id ? { ...item, [field]: value } : item
      )
    });
    setHasUnsavedChanges(true);
  };

  const menuItems = [
    { id: 'layout', label: 'Структура', icon: Layout },
    { id: 'hero', label: 'Главная', icon: Rocket },
    { id: 'partners', label: 'Партнеры', icon: Globe },
    { id: 'features', label: 'Преимущества', icon: Shield },
    { id: 'stats', label: 'Статистика', icon: BarChart3 },
    { id: 'process', label: 'Процесс', icon: Settings },
    { id: 'testimonials', label: 'Отзывы', icon: MessageSquare },
    { id: 'pricing', label: 'Цены', icon: CreditCard },
    { id: 'team', label: 'Команда', icon: Users },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
    { id: 'blog', label: 'Блог', icon: FileText },
    { id: 'ctaSection', label: 'Призыв к действию', icon: MousePointerClick },
    { id: 'footer', label: 'Контакты', icon: Phone },
    { id: 'settings', label: 'Настройки', icon: Settings },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';
    if (password === correctPassword) {
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white dark:bg-white/5 rounded-[2.5rem] p-10 border border-gray-200 dark:border-white/10 shadow-2xl"
        >
          <div className="flex flex-col items-center gap-6 mb-10">
            <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-primary/30 rotate-12">
              <Lock size={40} />
            </div>
            <div className="text-center">
              <h1 className="text-3xl font-black tracking-tighter mb-2">ADMIN ACCESS</h1>
              <p className="text-gray-400 text-sm">Введите пароль для входа в панель</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Password</label>
              <div className="relative">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl p-4 pl-12 outline-none focus:ring-2 ring-primary transition-all"
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
              <p className="text-[10px] text-primary ml-4 font-bold animate-pulse">
                🔑 Пароль: admin123
              </p>
            </div>

            {loginError && (
              <motion.p 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-red-500 text-xs font-bold text-center"
              >
                Неверный пароль. Попробуйте еще раз.
              </motion.p>
            )}

            <button type="submit" className="w-full btn-primary py-4 rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center gap-2">
              Войти <Rocket size={18} />
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark text-gray-900 dark:text-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-white/5 border-r border-gray-200 dark:border-white/10 p-6 flex flex-col gap-8 fixed h-full overflow-y-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-black shadow-lg shadow-primary/20">A</div>
          <span className="font-black tracking-tighter">ADMIN PANEL</span>
        </div>

        <nav className="flex flex-col gap-1">
          {menuItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all text-sm font-medium ${activeTab === item.id ? 'bg-primary text-white shadow-md shadow-primary/20' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10'}`}
            >
              <item.icon size={16} /> {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-gray-100 dark:border-white/10 flex flex-col gap-2">
          <button 
            onClick={() => window.location.href = '/'}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 transition-all text-gray-500 text-sm font-medium"
          >
            <ArrowLeft size={16} /> На сайт
          </button>
          <button className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-red-500/10 text-red-500 transition-all text-sm font-medium">
            <LogOut size={16} /> Выйти
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow ml-64 p-12 max-w-5xl">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-black mb-2">
              {menuItems.find(m => m.id === activeTab)?.label}
            </h1>
            <p className="text-gray-500">Управление контентом и переводами</p>
            {hasUnsavedChanges && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-orange-500 text-xs font-bold mt-2 flex items-center gap-2"
              >
                <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                Есть несохраненные изменения (сохранится автоматически через 2 сек)
              </motion.p>
            )}
          </div>

          <button 
            onClick={handleSave}
            disabled={isSaving || !hasUnsavedChanges}
            className={`btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-primary/20 ${!hasUnsavedChanges ? 'opacity-50' : ''}`}
          >
            {isSaving ? 'Сохранение...' : <><Save size={18} /> {hasUnsavedChanges ? 'Сохранить' : 'Сохранено'}</>}
          </button>
        </header>

        <AnimatePresence mode="wait">
          {showSuccess && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-green-500 text-white p-4 rounded-2xl mb-8 flex items-center gap-3 shadow-lg shadow-green-500/20"
            >
              <Check size={20} /> Изменения успешно сохранены!
            </motion.div>
          )}
        </AnimatePresence>

        <div className="bg-white dark:bg-white/5 rounded-[2.5rem] p-8 border border-gray-200 dark:border-white/10 shadow-xl">
          {activeTab === 'layout' && (
            <div className="space-y-4">
              <p className="text-sm text-gray-500 mb-6">Перетаскивайте секции для изменения структуры страницы.</p>
              <Reorder.Group axis="y" values={localConfig.layout} onReorder={updateLayout} className="space-y-3">
                {localConfig.layout.map((item) => (
                  <Reorder.Item 
                    key={item} 
                    value={item}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 cursor-grab active:cursor-grabbing group"
                  >
                    <div className="flex items-center gap-4">
                      <GripVertical size={18} className="text-gray-400" />
                      <span className="font-bold">{item}</span>
                    </div>
                  </Reorder.Item>
                ))}
              </Reorder.Group>
            </div>
          )}

          {activeTab === 'hero' && (
            <div className="space-y-8">
              <div className="border-b border-gray-200 dark:border-gray-700 pb-6 mb-6">
                <h3 className="text-lg font-black text-gray-900 dark:text-white mb-4">Основной контент</h3>
                <TranslationInput label="Заголовок" value={localConfig.hero.title} onChange={(v) => updateHero('title', v)} />
                <TranslationInput label="Подзаголовок" value={localConfig.hero.subtitle} onChange={(v) => updateHero('subtitle', v)} isTextArea />
                <TranslationInput label="Текст кнопки" value={localConfig.hero.cta} onChange={(v) => updateHero('cta', v)} />
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-black text-gray-900 dark:text-white">Карточка в правой части</h3>
                <TranslationInput label="Заголовок карточки" value={localConfig.hero.cardTitle || { ru: '', uz: '', en: '', tj: '' }} onChange={(v) => updateHero('cardTitle', v)} />
                <TranslationInput label="Описание карточки" value={localConfig.hero.cardSubtitle || { ru: '', uz: '', en: '', tj: '' }} onChange={(v) => updateHero('cardSubtitle', v)} isTextArea />
              </div>

              <div className="space-y-6 mt-8">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-black text-gray-900 dark:text-white">Преимущества в карточке</h3>
                  <button 
                    onClick={() => {
                      const currentFeatures = localConfig.hero.features || [];
                      updateHero('features', [...currentFeatures, { icon: 'rocket', label: { ru: '', uz: '', en: '', tj: '' } }]);
                    }} 
                    className="btn-secondary py-2 px-4 text-xs flex items-center gap-2"
                  >
                    <Plus size={14} /> Добавить
                  </button>
                </div>
                <div className="grid gap-6">
                  {(localConfig.hero.features || []).map((feature, idx) => (
                    <div key={idx} className="p-6 bg-gray-50 dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/10 space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <select
                            value={feature.icon}
                            onChange={(e) => {
                              const newFeatures = [...(localConfig.hero.features || [])];
                              newFeatures[idx] = { ...feature, icon: e.target.value as 'rocket' | 'chart' | 'zap' };
                              updateHero('features', newFeatures);
                            }}
                            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 text-sm font-bold outline-none focus:ring-2 ring-primary"
                          >
                            <option value="rocket">🚀 Rocket</option>
                            <option value="chart">📊 Chart</option>
                            <option value="zap">⚡ Zap</option>
                          </select>
                          <span className="text-xs font-bold text-gray-500">#{idx + 1}</span>
                        </div>
                        <button 
                          onClick={() => {
                            const newFeatures = (localConfig.hero.features || []).filter((_, i) => i !== idx);
                            updateHero('features', newFeatures);
                          }} 
                          className="text-red-500 p-2 hover:bg-red-500/10 rounded-lg transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <TranslationInput 
                        label="Название преимущества" 
                        value={feature.label} 
                        onChange={(v) => {
                          const newFeatures = [...(localConfig.hero.features || [])];
                          newFeatures[idx] = { ...feature, label: v };
                          updateHero('features', newFeatures);
                        }} 
                      />
                    </div>
                  ))}
                  {(localConfig.hero.features || []).length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-8">Преимущества не добавлены. Нажмите "Добавить", чтобы создать первое преимущество.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'partners' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">Список логотипов партнеров.</p>
                <button onClick={() => addItem('partners')} className="btn-secondary py-2 px-4 text-xs flex items-center gap-2">
                  <Plus size={14} /> Добавить
                </button>
              </div>
              <div className="grid gap-3">
                {localConfig.partners.map((p) => (
                  <div key={p.id} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10">
                    <input 
                      type="text" 
                      value={p.name || ''}
                      onChange={(e) => updateItem('partners', p.id, 'name', e.target.value)}
                      className="flex-grow bg-transparent font-bold outline-none"
                    />
                    <button onClick={() => removeItem('partners', p.id)} className="text-red-500 p-2 hover:bg-red-500/10 rounded-lg transition-all">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">Карточки преимуществ.</p>
                <button onClick={() => addItem('features')} className="btn-secondary py-2 px-4 text-xs flex items-center gap-2">
                  <Plus size={14} /> Добавить
                </button>
              </div>
              <div className="grid gap-6">
                {localConfig.features.map((f, idx) => (
                  <div key={f.id} className="p-6 bg-gray-50 dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/10 space-y-6">
                    <div className="flex justify-end">
                      <button onClick={() => removeItem('features', f.id)} className="text-red-500 p-2 hover:bg-red-500/10 rounded-lg transition-all">
                        <Trash2 size={18} />
                      </button>
                    </div>
                    
                    {/* Icon Selection with AI */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Иконка</label>
                        <button
                          onClick={async () => {
                            const title = f.title.ru || f.title.en || f.title.uz || '';
                            if (!title) {
                              alert('Сначала введите заголовок!');
                              return;
                            }
                            
                            try {
                              const response = await fetch('/api/ai-suggest-icon', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ title, description: f.desc.ru })
                              });
                              const data = await response.json();
                              if (data.icon) {
                                updateItem('features', f.id, 'icon', data.icon);
                              }
                            } catch (err) {
                              console.error('AI suggestion error:', err);
                              alert('Не удалось получить рекомендацию ИИ');
                            }
                          }}
                          className="text-xs flex items-center gap-1 text-primary hover:text-primary/80 font-bold"
                        >
                          <span className="material-icons-round text-sm">auto_awesome</span>
                          Подобрать ИИ
                        </button>
                      </div>
                      <div className="grid grid-cols-8 gap-2">
                        {[
                          'rocket_launch', 'analytics', 'security', 'support_agent', 
                          'devices', 'payments', 'cloud', 'speed', 'shield', 
                          'trending_up', 'account_balance', 'api', 'storage', 
                          'psychology', 'lightbulb', 'engineering', 'hub', 'network_check'
                        ].map(iconName => (
                          <button
                            key={iconName}
                            onClick={() => updateItem('features', f.id, 'icon', iconName)}
                            className={`p-3 rounded-xl flex items-center justify-center transition-all ${
                              f.icon === iconName
                                ? 'bg-primary text-white shadow-lg scale-110'
                                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                            title={iconName}
                          >
                            <span className="material-icons-round text-xl">{iconName}</span>
                          </button>
                        ))}
                      </div>
                      {f.icon && (
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span className="material-icons-round text-sm">check_circle</span>
                          Выбрана: {f.icon}
                        </div>
                      )}
                    </div>
                    
                    <TranslationInput label="Заголовок" value={f.title} onChange={(v) => updateItem('features', f.id, 'title', v)} />
                    <TranslationInput label="Описание" value={f.desc} onChange={(v) => updateItem('features', f.id, 'desc', v)} isTextArea />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">Числовые показатели.</p>
                <button onClick={() => addItem('stats')} className="btn-secondary py-2 px-4 text-xs flex items-center gap-2">
                  <Plus size={14} /> Добавить
                </button>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                {localConfig.stats.map((s) => (
                  <div key={s.id} className="p-6 bg-gray-50 dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/10 space-y-4">
                    <div className="flex justify-between items-center">
                      <input 
                        type="text" 
                        value={s.value || ''}
                        onChange={(e) => updateItem('stats', s.id, 'value', e.target.value)}
                        className="bg-transparent font-black text-2xl outline-none text-primary"
                      />
                      <button onClick={() => removeItem('stats', s.id)} className="text-red-500 p-2 hover:bg-red-500/10 rounded-lg transition-all">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <TranslationInput label="Подпись" value={s.label} onChange={(v) => updateItem('stats', s.id, 'label', v)} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'process' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">Этапы работы.</p>
                <button onClick={() => addItem('process')} className="btn-secondary py-2 px-4 text-xs flex items-center gap-2">
                  <Plus size={14} /> Добавить
                </button>
              </div>
              <div className="grid gap-6">
                {localConfig.process.map((p) => (
                  <div key={p.id} className="p-6 bg-gray-50 dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/10 space-y-6">
                    <div className="flex justify-between items-center">
                      <input 
                        type="text" 
                        value={p.num || ''}
                        onChange={(e) => updateItem('process', p.id, 'num', e.target.value)}
                        className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-black text-center outline-none"
                      />
                      <button onClick={() => removeItem('process', p.id)} className="text-red-500 p-2 hover:bg-red-500/10 rounded-lg transition-all">
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <TranslationInput label="Заголовок" value={p.title} onChange={(v) => updateItem('process', p.id, 'title', v)} />
                    <TranslationInput label="Описание" value={p.desc} onChange={(v) => updateItem('process', p.id, 'desc', v)} isTextArea />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'testimonials' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">Отзывы клиентов.</p>
                <button onClick={() => addItem('testimonials')} className="btn-secondary py-2 px-4 text-xs flex items-center gap-2">
                  <Plus size={14} /> Добавить
                </button>
              </div>
              <div className="grid gap-6">
                {localConfig.testimonials.map((t) => (
                  <div key={t.id} className="p-6 bg-gray-50 dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/10 space-y-6">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-4 items-center">
                        <img src={t.img} className="w-12 h-12 rounded-full object-cover" />
                        <input 
                          type="text" 
                          value={t.name || ''}
                          onChange={(e) => updateItem('testimonials', t.id, 'name', e.target.value)}
                          className="bg-transparent font-bold outline-none"
                        />
                      </div>
                      <button onClick={() => removeItem('testimonials', t.id)} className="text-red-500 p-2 hover:bg-red-500/10 rounded-lg transition-all">
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <TranslationInput label="Роль" value={t.role} onChange={(v) => updateItem('testimonials', t.id, 'role', v)} />
                    <TranslationInput label="Отзыв" value={t.content} onChange={(v) => updateItem('testimonials', t.id, 'content', v)} isTextArea />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'pricing' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">Тарифные планы.</p>
                <button onClick={() => addItem('pricing')} className="btn-secondary py-2 px-4 text-xs flex items-center gap-2">
                  <Plus size={14} /> Добавить
                </button>
              </div>
              <div className="grid gap-6">
                {localConfig.pricing.map((plan) => (
                  <div key={plan.id} className="p-6 bg-gray-50 dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/10 space-y-6">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <TranslationInput label="Название" value={plan.name} onChange={(v) => updateItem('pricing', plan.id, 'name', v)} />
                        <div className="flex items-center gap-2">
                          <input 
                            type="checkbox" 
                            checked={plan.isPopular}
                            onChange={(e) => updateItem('pricing', plan.id, 'isPopular', e.target.checked)}
                            className="w-4 h-4 accent-primary"
                          />
                          <span className="text-xs font-bold uppercase">Популярный</span>
                        </div>
                      </div>
                      <button onClick={() => removeItem('pricing', plan.id)} className="text-red-500 p-2 hover:bg-red-500/10 rounded-lg transition-all">
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">Цена ($)</label>
                        <input 
                          type="text" 
                          value={plan.price || ''}
                          onChange={(e) => updateItem('pricing', plan.id, 'price', e.target.value)}
                          className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl p-4 outline-none focus:ring-2 ring-primary"
                        />
                      </div>
                      <TranslationInput label="Период" value={plan.period} onChange={(v) => updateItem('pricing', plan.id, 'period', v)} />
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">Преимущества</label>
                        <button 
                          onClick={() => {
                            const newFeatures = [...plan.features, { ru: '', uz: '', en: '' }];
                            updateItem('pricing', plan.id, 'features', newFeatures);
                          }}
                          className="text-primary text-xs font-bold hover:underline"
                        >
                          + Добавить
                        </button>
                      </div>
                      <div className="space-y-3">
                        {plan.features.map((feature, idx) => (
                          <div key={idx} className="flex gap-2 items-start">
                            <div className="flex-grow">
                              <TranslationInput 
                                label={`Преимущество ${idx + 1}`}
                                value={feature} 
                                onChange={(v) => {
                                  const newFeatures = [...plan.features];
                                  newFeatures[idx] = v;
                                  updateItem('pricing', plan.id, 'features', newFeatures);
                                }} 
                              />
                            </div>
                            <button 
                              onClick={() => {
                                const newFeatures = plan.features.filter((_, i) => i !== idx);
                                updateItem('pricing', plan.id, 'features', newFeatures);
                              }}
                              className="text-red-500 p-2 hover:bg-red-500/10 rounded-lg transition-all mt-8"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">Сотрудники и контакты.</p>
                <button onClick={() => addItem('team')} className="btn-secondary py-2 px-4 text-xs flex items-center gap-2">
                  <Plus size={14} /> Добавить
                </button>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                {localConfig.team.map((m) => (
                  <div key={m.id} className="p-6 bg-gray-50 dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/10 space-y-6">
                    <div className="relative aspect-square rounded-2xl overflow-hidden group">
                      <img src={m.img} className="w-full h-full object-cover" />
                      <div className="absolute top-2 right-2">
                        <button onClick={() => removeItem('team', m.id)} className="bg-red-500 text-white p-2 rounded-xl shadow-lg">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <input 
                      type="text" 
                      value={m.name || ''}
                      onChange={(e) => updateItem('team', m.id, 'name', e.target.value)}
                      className="w-full bg-transparent font-black text-lg outline-none border-b border-transparent focus:border-primary"
                      placeholder="Имя Фамилия"
                    />
                    <TranslationInput label="Роль" value={m.role} onChange={(v) => updateItem('team', m.id, 'role', v)} />
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-1">
                          <Send size={10} /> Telegram
                        </label>
                        <input 
                          type="text" 
                          value={m.telegram || ''}
                          onChange={(e) => updateItem('team', m.id, 'telegram', e.target.value)}
                          className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl p-3 text-xs outline-none"
                          placeholder="@username"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-1">
                          <MessageCircle size={10} /> WhatsApp
                        </label>
                        <input 
                          type="text" 
                          value={m.whatsapp || ''}
                          onChange={(e) => updateItem('team', m.id, 'whatsapp', e.target.value)}
                          className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl p-3 text-xs outline-none"
                          placeholder="+998..."
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">Вопросы и ответы.</p>
                <button onClick={() => addItem('faq')} className="btn-secondary py-2 px-4 text-xs flex items-center gap-2">
                  <Plus size={14} /> Добавить
                </button>
              </div>
              <div className="grid gap-6">
                {localConfig.faq.map((item) => (
                  <div key={item.id} className="p-6 bg-gray-50 dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/10 space-y-6">
                    <div className="flex justify-end">
                      <button onClick={() => removeItem('faq', item.id)} className="text-red-500 p-2 hover:bg-red-500/10 rounded-lg transition-all">
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <TranslationInput label="Вопрос" value={item.question} onChange={(v) => updateItem('faq', item.id, 'question', v)} />
                    <TranslationInput label="Ответ" value={item.answer} onChange={(v) => updateItem('faq', item.id, 'answer', v)} isTextArea />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'blog' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">Статьи блога.</p>
                <button onClick={() => addItem('blog')} className="btn-secondary py-2 px-4 text-xs flex items-center gap-2">
                  <Plus size={14} /> Добавить
                </button>
              </div>
              <div className="grid gap-6">
                {localConfig.blog.map((post) => (
                  <div key={post.id} className="p-6 bg-gray-50 dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/10 space-y-6">
                    <div className="flex justify-between items-start">
                      <div className="w-32 aspect-video rounded-xl overflow-hidden">
                        <img src={post.img} className="w-full h-full object-cover" />
                      </div>
                      <button onClick={() => removeItem('blog', post.id)} className="text-red-500 p-2 hover:bg-red-500/10 rounded-lg transition-all">
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <TranslationInput label="Заголовок" value={post.title} onChange={(v) => updateItem('blog', post.id, 'title', v)} />
                    <div className="grid grid-cols-2 gap-4">
                      <TranslationInput label="Категория" value={post.category} onChange={(v) => updateItem('blog', post.id, 'category', v)} />
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">Дата</label>
                        <input 
                          type="text" 
                          value={post.date || ''}
                          onChange={(e) => updateItem('blog', post.id, 'date', e.target.value)}
                          className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl p-4 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'ctaSection' && (
            <div className="space-y-8">
              <TranslationInput label="Заголовок" value={localConfig.ctaSection.title} onChange={(v) => setLocalConfig({...localConfig, ctaSection: {...localConfig.ctaSection, title: v}})} />
              <TranslationInput label="Подзаголовок" isTextArea value={localConfig.ctaSection.subtitle} onChange={(v) => setLocalConfig({...localConfig, ctaSection: {...localConfig.ctaSection, subtitle: v}})} />
              <TranslationInput label="Текст кнопки" value={localConfig.ctaSection.buttonText} onChange={(v) => setLocalConfig({...localConfig, ctaSection: {...localConfig.ctaSection, buttonText: v}})} />
            </div>
          )}

          {activeTab === 'footer' && (
            <div className="space-y-8">
              <TranslationInput label="Адрес" value={localConfig.footer.address} onChange={(v) => updateFooter('address', v)} />
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400">Email</label>
                  <input 
                    type="email" 
                    value={localConfig.footer.email || ''}
                    onChange={(e) => updateFooter('email', e.target.value)}
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl p-4 outline-none focus:ring-2 ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400">Телефон</label>
                  <input 
                    type="text" 
                    value={localConfig.footer.phone || ''}
                    onChange={(e) => updateFooter('phone', e.target.value)}
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl p-4 outline-none focus:ring-2 ring-primary"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-8">
              <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 p-8 rounded-3xl space-y-6 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    <MessageCircle size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Интеграция Tawk.to</h3>
                    <p className="text-sm text-gray-400">Введите ID виджета для подключения чата поддержки</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400">Tawk.to Property ID</label>
                  <input 
                    type="text" 
                    placeholder="Например: 60f7.../1fb..."
                    value={localConfig.tawkId || ''}
                    onChange={(e) => setLocalConfig({...localConfig, tawkId: e.target.value})}
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl p-4 outline-none focus:ring-2 ring-primary transition-all"
                  />
                  <p className="text-[10px] text-gray-400 mt-2">
                    ID можно найти в панели Tawk.to в разделе "Administration" → "Chat Widget".
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;

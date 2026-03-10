import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, User } from 'lucide-react';
import { io, Socket } from 'socket.io-client';

interface Message {
  id?: number;
  chat_id: string;
  sender: string;
  text: string;
  timestamp: string;
}

const ChatWidget = ({ lang }: { lang: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [chatId, setChatId] = useState<string>(() => {
    const saved = localStorage.getItem('chat_id');
    if (saved) return saved;
    const newId = Math.random().toString(36).substring(7);
    localStorage.setItem('chat_id', newId);
    return newId;
  });
  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen && !socketRef.current) {
      socketRef.current = io();
      
      socketRef.current.emit('join', { chatId, userName: 'Guest' });

      socketRef.current.on('history', (history: Message[]) => {
        setMessages(history);
      });

      socketRef.current.on('message', (msg: Message) => {
        if (msg.chat_id === chatId) {
          setMessages(prev => [...prev, msg]);
        }
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [isOpen, chatId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !socketRef.current) return;

    const msg = {
      chatId,
      text: inputText,
      sender: 'user'
    };

    socketRef.current.emit('message', msg);
    setInputText('');
  };

  const t = {
    ru: { title: 'Чат поддержки', placeholder: 'Введите сообщение...', start: 'Здравствуйте! Чем мы можем вам помочь?' },
    uz: { title: 'Qo\'llab-quvvatlash', placeholder: 'Xabar yozing...', start: 'Assalomu alaykum! Sizga qanday yordam bera olamiz?' },
    en: { title: 'Support Chat', placeholder: 'Type a message...', start: 'Hello! How can we help you today?' },
    tj: { title: 'Чати дастгирӣ', placeholder: 'Паём ворид кунед...', start: 'Салом! Мо ба шумо чӣ гуна кӯмак карда метавонем?' }
  }[lang as 'ru' | 'uz' | 'en' | 'tj'] || { title: 'Support Chat', placeholder: 'Type a message...', start: 'Hello!' };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[350px] h-[500px] bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">{t.title}</h3>
                  <p className="text-[10px] opacity-80">Онлайн</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-hide">
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-2xl rounded-tl-none max-w-[80%] text-sm">
                  {t.start}
                </div>
              </div>
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-3 rounded-2xl max-w-[80%] text-sm ${
                    msg.sender === 'user' 
                      ? 'bg-primary text-white rounded-tr-none' 
                      : 'bg-gray-100 dark:bg-gray-800 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-100 dark:border-gray-800 flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={t.placeholder}
                className="flex-grow bg-gray-50 dark:bg-gray-800 border-none rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 ring-primary transition-all"
              />
              <button type="submit" className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-blue-700 transition-colors">
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-primary text-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
};

export default ChatWidget;

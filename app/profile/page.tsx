'use client';
import { motion } from 'framer-motion';
import { Wallet, ShoppingBag, Tag, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

export default function Profile() {
  const stats = [
    { label: 'Покупки', value: '12', icon: <ShoppingBag />, color: 'text-blue-400' },
    { label: 'Продажи', value: '5', icon: <Tag />, color: 'text-green-400' },
    { label: 'Пополнения', value: '+500$', icon: <ArrowUpCircle />, color: 'text-neonBlue' },
    { label: 'Снятия', value: '-200$', icon: <ArrowDownCircle />, color: 'text-neonRed' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-6 font-sans">
      {/* Шапка профиля */}
      <div className="text-center mb-10">
        <div className="relative inline-block">
            <div className="w-24 h-24 bg-gradient-to-tr from-blue-600 to-red-600 rounded-full p-1 shadow-[0_0_30px_rgba(0,100,255,0.5)]">
               <div className="w-full h-full bg-[#0A0A0A] rounded-full flex items-center justify-center text-2xl font-bold">
                 AN
               </div>
            </div>
            {/* Твой юзернейм */}
            <h1 className="mt-4 text-xl font-bold tracking-widest uppercase">anva4ik</h1>
            <p className="text-neonBlue text-sm">Администратор</p>
        </div>
      </div>

      {/* Баланс */}
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="bg-gray-900/50 border border-blue-500/30 p-6 rounded-3xl mb-8 backdrop-blur-xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-4 opacity-20"><Wallet size={80}/></div>
        <p className="text-gray-400 text-sm uppercase">Доступный баланс</p>
        <h2 className="text-4xl font-black mt-2">150.50 <span className="text-sm text-blue-400">USDT</span></h2>
        
        <div className="flex gap-3 mt-6">
            <button className="flex-1 py-3 bg-neonRed rounded-xl font-bold shadow-neon-red animate-neon-pulse">СНЯТЬ</button>
            <button className="flex-1 py-3 bg-neonBlue rounded-xl font-bold shadow-neon-blue">ПОПОЛНИТЬ</button>
        </div>
      </motion.div>

      {/* Сетка статистики */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="bg-gray-900/30 border border-white/5 p-4 rounded-2xl flex flex-col items-center">
            <div className={`mirror-icon ${s.color} mb-2`}>{s.icon}</div>
            <span className="text-2xl font-bold">{s.value}</span>
            <span className="text-xs text-gray-500 uppercase">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}


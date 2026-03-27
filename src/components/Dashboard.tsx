import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { getMasteryLevel, getLevelBadge, Unit, MasteryLevel } from '../types';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Award, 
  Clock, 
  BookOpen, 
  ChevronRight, 
  Play, 
  CheckCircle2, 
  Lock,
  History,
  LayoutDashboard,
  GraduationCap,
  Trophy,
  Sword,
  Apple,
  Sprout
} from 'lucide-react';

interface LearningPathItem {
  id: string;
  title: string;
  icon: React.ReactNode;
}

const LEARNING_PATHS: LearningPathItem[] = [
  { id: 'k12', title: 'Ôn thi chuyển cấp', icon: <GraduationCap className="w-5 h-5" /> },
  { id: 'ielts', title: 'Ôn IELTS', icon: <BookOpen className="w-5 h-5" /> },
  { id: 'cambridge', title: 'Ôn Cambridge', icon: <Trophy className="w-5 h-5" /> },
];

const getLevelIcon = (level: MasteryLevel) => {
  switch (level) {
    case MasteryLevel.CHAMPION: return <span className="text-lg">🏆</span>;
    case MasteryLevel.ACHIEVER: return <span className="text-lg">🏅</span>;
    case MasteryLevel.CHALLENGER: return <span className="text-lg">⚔️</span>;
    case MasteryLevel.EXPLORER: return <span className="text-lg">🍎</span>;
    default: return <span className="text-lg">🌱</span>;
  }
};

const getLevelColor = (level: MasteryLevel) => {
  switch (level) {
    case MasteryLevel.CHAMPION: return 'text-yellow-600 bg-yellow-50 border-yellow-100';
    case MasteryLevel.ACHIEVER: return 'text-purple-600 bg-purple-50 border-purple-100';
    case MasteryLevel.CHALLENGER: return 'text-indigo-600 bg-indigo-50 border-indigo-100';
    case MasteryLevel.EXPLORER: return 'text-sky-600 bg-sky-50 border-sky-100';
    default: return 'text-slate-500 bg-slate-50 border-slate-100';
  }
};

export const Dashboard: React.FC<{ onResume: (unitId: string) => void }> = ({ onResume }) => {
  const { progress } = useApp();
  const [activePath, setActivePath] = useState('k12');

  if (!progress) return null;

  const units = Object.values(progress.units) as Unit[];
  const totalMasteryPoints = units.reduce((acc, curr) => acc + curr.masteryPoints, 0);
  const averagePoints = Math.round(totalMasteryPoints / units.length);
  const overallLevel = getMasteryLevel(averagePoints);
  
  const completedUnits = units.filter(u => u.masteryPoints >= 100).length;
  const inProgressUnit = units.find(u => u.unlocked && u.masteryPoints < 100);

  // Mock activities
  const activities = [
    { id: 1, type: 'achievement', text: 'Bạn đạt Achiever – Vocabulary 2', time: '2 giờ trước', icon: <span>🏅</span> },
    { id: 2, type: 'level-up', text: 'Bạn lên Challenger – Grammar 1', time: '5 giờ trước', icon: <span>🚀</span> },
    { id: 3, type: 'error', text: 'Bạn làm sai Mini Test – Listening 3', time: '1 ngày trước', icon: <span>❌</span> },
  ];

  const handlePathChange = (pathId: string) => {
    setActivePath(pathId);
  };

  return (
    <div className="pt-20 min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-100 fixed h-full hidden lg:block pt-8">
        <div className="px-6 mb-8">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Lộ trình của tôi</h2>
          <nav className="space-y-2">
            {LEARNING_PATHS.map((path) => (
              <button
                key={path.id}
                onClick={() => handlePathChange(path.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all relative ${
                  activePath === path.id 
                    ? 'bg-sky-50 text-sky-600' 
                    : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                {path.icon}
                {path.title}
                {activePath === path.id && (
                  <motion.div 
                    layoutId="active-indicator"
                    className="absolute left-0 w-1 h-6 bg-sky-500 rounded-r-full"
                  />
                )}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-72 p-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex justify-between items-end">
            <div>
              <div className="flex items-center gap-2 text-sky-500 font-bold text-[10px] uppercase tracking-widest mb-2">
                <span>{LEARNING_PATHS.find(p => p.id === activePath)?.title}</span>
              </div>
              <h1 className="text-3xl font-black text-slate-800 font-headline mb-2">
                Phân tích học tập
              </h1>
              <p className="text-slate-400 text-sm">Chào mừng quay trở lại! Hôm nay bạn đã học được 45 phút.</p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                Xuất báo cáo
              </button>
            </div>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${getLevelColor(overallLevel)}`}>
                    {getLevelIcon(overallLevel)}
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${getLevelColor(overallLevel)}`}>
                    {overallLevel}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-bold uppercase mb-1">Tổng điểm Mastery</p>
                <p className="text-2xl font-black text-slate-800 mb-4">{totalMasteryPoints} pts</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                  <span>Tiến độ tổng</span>
                  <span>{averagePoints}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${averagePoints}%` }}></div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-500 mb-4">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <p className="text-xs text-slate-400 font-bold uppercase mb-1">Đơn vị hoàn thành</p>
              <p className="text-2xl font-black text-slate-800 mb-2">{completedUnits} / {units.length}</p>
              <p className="text-xs text-slate-400">Bạn đã đạt Champion ở {completedUnits} đơn vị 🎉</p>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-sky-100 bg-gradient-to-br from-white to-sky-50/30 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center text-sky-600 mb-4">
                  <Play className="w-5 h-5" />
                </div>
                <p className="text-xs text-slate-400 font-bold uppercase mb-1">Đang học</p>
                <p className="text-lg font-bold text-slate-800 mb-4 truncate">{inProgressUnit?.title || 'Tất cả đã hoàn thành!'}</p>
              </div>
              {inProgressUnit && (
                <button 
                  onClick={() => onResume(inProgressUnit.id)}
                  className="w-full py-3 bg-sky-500 text-white rounded-xl font-bold text-sm hover:bg-sky-600 transition-all shadow-lg shadow-sky-200 flex items-center justify-center gap-2"
                >
                  Học tiếp <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Mastery Table */}
            <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-800 font-headline">Mức độ thông thạo</h3>
                <div className="flex gap-2">
                  <select className="text-xs font-bold text-slate-400 bg-slate-50 border-none rounded-lg px-3 py-1.5 focus:ring-0">
                    <option>Tất cả module</option>
                  </select>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50">
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Đơn vị kiến thức</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mastery Level</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Điểm</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {units.map((unit) => {
                      const level = getMasteryLevel(unit.masteryPoints);
                      return (
                        <tr 
                          key={unit.id} 
                          className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                          onClick={() => onResume(unit.id)}
                        >
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-slate-100 overflow-hidden">
                                <img src={`https://picsum.photos/seed/${unit.id}/100/100`} alt="" className="w-full h-full object-cover" />
                              </div>
                              <span className="font-bold text-slate-700 text-sm group-hover:text-sky-600 transition-colors">{unit.title}</span>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-2">
                              <div className={`p-1.5 rounded-lg border ${getLevelColor(level)}`}>
                                {getLevelIcon(level)}
                              </div>
                              <span className="text-xs font-bold text-slate-600">{level}</span>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex flex-col gap-1.5 w-24">
                              <span className="text-xs font-bold text-slate-800">{unit.masteryPoints} pts</span>
                              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-sky-400 rounded-full" style={{ width: `${unit.masteryPoints}%` }}></div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            {unit.masteryPoints >= 100 ? (
                              <span className="flex items-center gap-1.5 text-[10px] font-bold text-green-500 uppercase">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Hoàn thành
                              </span>
                            ) : unit.unlocked ? (
                              <span className="flex items-center gap-1.5 text-[10px] font-bold text-sky-500 uppercase">
                                <TrendingUp className="w-3.5 h-3.5" /> Đang học
                              </span>
                            ) : (
                              <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-300 uppercase">
                                <Lock className="w-3.5 h-3.5" /> Đang khóa
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Activity Timeline */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold text-slate-800 font-headline">Hoạt động gần đây</h3>
                <History className="w-5 h-5 text-slate-300" />
              </div>
              <div className="space-y-8 relative before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-50">
                {activities.map((activity) => (
                  <div key={activity.id} className="relative pl-10">
                    <div className="absolute left-0 top-0 w-8 h-8 bg-white border-2 border-slate-50 rounded-full flex items-center justify-center z-10">
                      {activity.icon}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-700 mb-1 leading-tight">{activity.text}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-10 py-3 text-sm font-bold text-sky-500 hover:bg-sky-50 rounded-xl transition-all border border-transparent hover:border-sky-100">
                Xem tất cả hoạt động
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

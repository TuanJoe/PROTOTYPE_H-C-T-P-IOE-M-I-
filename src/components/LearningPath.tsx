import React from 'react';
import { useApp } from '../AppContext';
import { getMasteryLevel, getLevelBadge, Unit } from '../types';
import { motion } from 'motion/react';
import { Lock, Play, ArrowLeft } from 'lucide-react';

export const LearningPath: React.FC<{ pathId: string; onSelectUnit: (id: string) => void; onBack: () => void }> = ({ pathId, onSelectUnit, onBack }) => {
  const { progress, loading } = useApp();

  if (loading || !progress) return <div className="pt-32 text-center">Đang tải lộ trình...</div>;

  const units = Object.values(progress.units) as Unit[];

  const getPathTitle = () => {
    if (pathId.startsWith('k12-')) {
      const parts = pathId.split('-');
      const subId = parts[1];
      const modeId = parts[2];
      
      let baseTitle = '';
      switch (subId) {
        case 'grade6': baseTitle = 'Thi vào lớp 6'; break;
        case 'grade10': baseTitle = 'Thi vào lớp 10'; break;
        case 'highschool': baseTitle = 'Thi THPT Quốc gia'; break;
        default: baseTitle = 'Ôn thi chuyển cấp';
      }

      if (modeId) {
        let modeName = '';
        switch (modeId) {
          case 'topics': modeName = 'Ôn tập chủ điểm'; break;
          case 'specialized': modeName = 'Luyện chuyên đề'; break;
          case 'mock': modeName = 'Luyện đề thi thử'; break;
        }
        return `${baseTitle} - ${modeName}`;
      }
      return baseTitle;
    }
    if (pathId.startsWith('ielts-')) {
      const subId = pathId.split('-')[1];
      switch (subId) {
        case 'pre': return 'Lộ trình PRE-IELTS';
        case '3-5': return 'Lộ trình IELTS 3-5';
        case '6-7': return 'Lộ trình IELTS 6-7';
        case '7plus': return 'Lộ trình IELTS 7+';
        default: return 'IELTS Mastery';
      }
    }
    switch (pathId) {
      case 'ielts': return 'IELTS Mastery';
      case 'cambridge': return 'Cambridge A2-B1';
      case 'gdpt': return 'Chương trình GDPT';
      case 'writing-speaking': return 'Ôn luyện chuyên sâu Writing - Speaking';
      default: return 'Lộ trình học tập';
    }
  };

  return (
    <div className="pt-24 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-primary font-bold text-sm mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại chọn lộ trình
        </button>
        <div className="bg-primary p-12 rounded-3xl text-white mb-12 relative overflow-hidden shadow-xl shadow-primary/20">
          <div className="relative z-10">
            <span className="bg-orange-400 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase mb-4 inline-block">Tài khoản Premium</span>
            <h1 className="text-4xl font-extrabold font-headline mb-4">{getPathTitle()}</h1>
            <p className="text-white/90 max-w-xl">Tiếp tục hành trình chinh phục tiếng Anh với lộ trình được cá nhân hóa dành riêng cho mục tiêu của bạn.</p>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-primary-container flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-container rounded-xl flex items-center justify-center text-primary">
              <Play className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase">Bài học đang học</p>
              <p className="font-bold text-lg text-slate-800">{units.length} Bài học</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-primary-container flex items-center gap-4">
            <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center text-sky-600">
              🏅
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase">Thông thạo đạt được</p>
              <p className="font-bold text-lg text-slate-800">12 Badge</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-primary-container flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500">
              🔥
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase">Chuỗi ngày học tập</p>
              <p className="font-bold text-lg text-slate-800">{progress.streak} Ngày</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {units.map((unit) => {
            const level = getMasteryLevel(unit.masteryPoints);
            const badge = getLevelBadge(level);
            
            return (
              <motion.div 
                key={unit.id}
                whileHover={unit.unlocked ? { y: -5 } : {}}
                className={`bg-white rounded-2xl overflow-hidden shadow-sm border transition-all ${unit.unlocked ? 'border-primary-container hover:shadow-md' : 'border-slate-100 opacity-75'}`}
              >
                <div className="h-32 bg-slate-50 relative">
                  <img src={`https://picsum.photos/seed/${unit.id}/400/200`} alt={unit.title} className="w-full h-full object-cover" />
                  {!unit.unlocked && (
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center text-white">
                      <Lock className="w-8 h-8" />
                    </div>
                  )}
                  {unit.unlocked && (
                    <div className="absolute top-2 left-2 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                      {unit.id === 'unit-4' ? 'Active' : 'Unit'}
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h4 className="font-bold font-headline mb-2 text-slate-800">{unit.title}</h4>
                  <p className="text-xs text-slate-400 mb-4 line-clamp-2">{unit.description}</p>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-[10px] font-bold text-slate-300 uppercase mb-1">
                      <span>Tiến độ: {unit.masteryPoints}%</span>
                      <span>{badge} {level}</span>
                    </div>
                    <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${unit.masteryPoints}%` }}></div>
                    </div>
                  </div>

                  <button 
                    disabled={!unit.unlocked}
                    onClick={() => onSelectUnit(unit.id)}
                    className={`w-full py-2 rounded-xl font-bold text-sm transition-all ${unit.unlocked ? 'bg-primary text-white hover:bg-primary-light shadow-md shadow-primary/10' : 'bg-slate-50 text-slate-300 cursor-not-allowed'}`}
                  >
                    {unit.unlocked ? 'Học tiếp' : 'Bị khóa'}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

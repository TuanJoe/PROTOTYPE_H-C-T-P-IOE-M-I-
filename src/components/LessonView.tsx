import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { getMasteryLevel, getLevelBadge } from '../types';
import { Play, Info, Download, Rocket, Edit3, Save, HelpCircle, ChevronRight, CheckCircle, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const LessonView: React.FC<{ unitId: string; onStartTest: () => void }> = ({ unitId, onStartTest }) => {
  const { progress } = useApp();
  const unit = progress?.units[unitId];
  const [note, setNote] = useState("");

  if (!unit) return <div className="pt-32 text-center">Không tìm thấy bài học.</div>;

  const level = getMasteryLevel(unit.masteryPoints);
  const badge = getLevelBadge(level);

  return (
    <div className="flex pt-16 h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-primary-container flex flex-col p-4 overflow-y-auto">
        <div className="px-4 py-6 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center text-primary">
              <BookOpenIcon />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800 uppercase">K12 English Mastery</h2>
              <p className="text-[10px] text-slate-400">Tiến độ: 65% Hoàn thành</p>
            </div>
          </div>
          <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
            <div className="h-full bg-primary w-[65%]"></div>
          </div>
        </div>

        <nav className="flex flex-col gap-1">
          <p className="px-4 py-2 text-[10px] font-bold text-slate-300 uppercase tracking-widest">Mục lục bài học</p>
          <div className="px-4 py-3 flex items-center gap-3 text-slate-500 hover:bg-primary-container/30 rounded-xl cursor-pointer">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-sm">Module 1: Foundations</span>
          </div>
          <div className="bg-primary-container/20 rounded-xl">
            <div className="px-4 py-3 flex items-center justify-between text-primary font-bold">
              <div className="flex items-center gap-3">
                <BookOpenIcon />
                <span className="text-sm">Module 2: Grammar</span>
              </div>
              <ChevronRight className="w-4 h-4 rotate-90" />
            </div>
            <div className="pl-11 pr-4 pb-4 space-y-2">
              <div className="text-sm text-slate-500 hover:text-primary cursor-pointer">2.1 Present Simple</div>
              <div className="text-sm text-primary font-bold flex items-center gap-2">
                <div className="w-1 h-4 bg-primary rounded-full"></div>
                2.2 Present Continuous
              </div>
              <div className="text-sm text-slate-300 flex items-center gap-2 cursor-not-allowed">
                <Lock className="w-3 h-3" /> 2.3 Past Simple
              </div>
            </div>
          </div>
        </nav>

        <div className="mt-auto p-4 bg-primary-container/30 rounded-2xl border border-primary/10">
          <p className="text-[10px] font-bold text-primary uppercase mb-2">Lesson Reward</p>
          <div className="flex items-center gap-2">
            <span className="text-lg">🏅</span>
            <span className="text-[10px] text-slate-500 font-medium">Hoàn thành bài học để nhận +500 XP</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-slate-50/30 px-8 py-8">
        <div className="max-w-5xl mx-auto space-y-8">
          <section>
            <nav className="flex items-center gap-2 text-[10px] text-slate-300 font-bold uppercase mb-2">
              <span>Module 2: Grammar</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-primary">{unit.title}</span>
            </nav>
            <div className="flex justify-between items-end">
              <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">{unit.title}</h1>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded-full">CƠ BẢN</span>
                <span className="px-3 py-1 bg-orange-50 text-orange-500 text-[10px] font-bold rounded-full">15 PHÚT</span>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-8 space-y-6">
              <div className="rounded-3xl overflow-hidden bg-slate-900 aspect-video relative group shadow-xl">
                <img 
                  src="https://picsum.photos/seed/lesson/1280/720" 
                  alt="Lesson" 
                  className="w-full h-full object-cover opacity-60"
                />
                <button className="absolute inset-0 m-auto w-20 h-20 bg-primary/90 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 fill-current" />
                </button>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-primary-container">
                <div className="flex items-center gap-2 mb-6 text-primary">
                  <Info className="w-5 h-5" />
                  <h3 className="text-xl font-bold">Nội dung bài học</h3>
                </div>
                <p className="text-slate-500 leading-relaxed mb-8">{unit.description}</p>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-5 bg-slate-50 rounded-2xl">
                    <h4 className="text-[10px] font-bold text-slate-300 uppercase mb-4">Mục tiêu đạt được</h4>
                    <ul className="space-y-3 text-sm text-slate-600">
                      <li className="flex items-center gap-2">✨ Nắm vững cấu trúc S + am/is/are + V-ing</li>
                      <li className="flex items-center gap-2">✨ Biết cách thêm đuôi -ing cho động từ</li>
                    </ul>
                  </div>
                  <div className="p-5 bg-slate-50 rounded-2xl">
                    <h4 className="text-[10px] font-bold text-slate-300 uppercase mb-4">Tài liệu đính kèm</h4>
                    <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-primary-container hover:border-primary transition-colors cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Download className="w-4 h-4 text-red-400" />
                        <span className="text-xs font-medium text-slate-600">Grammar_Sheet_02.pdf</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary to-primary-light p-8 rounded-3xl shadow-lg flex items-center justify-between text-white">
                <div>
                  <h3 className="text-2xl font-extrabold mb-1">Đã hiểu bài chưa?</h3>
                  <p className="text-white/90 text-sm">Làm bài Mini Test nhanh 10 câu để củng cố kiến thức!</p>
                </div>
                <button 
                  onClick={onStartTest}
                  className="bg-white text-primary px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all shadow-lg flex items-center gap-3"
                >
                  Làm Mini Test <Rocket className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-4 space-y-6">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-primary-container flex flex-col h-[500px]">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold flex items-center gap-2 text-slate-800">
                    <Edit3 className="w-5 h-5 text-orange-400" /> Ghi chú
                  </h3>
                  <button className="p-2 hover:bg-slate-50 rounded-xl text-slate-300">
                    <Save className="w-4 h-4" />
                  </button>
                </div>
                <textarea 
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="flex-1 w-full bg-slate-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-primary/20 resize-none text-slate-600"
                  placeholder="Nhập ghi chú của bạn..."
                />
              </div>

              <div className="bg-slate-800 p-6 rounded-3xl text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/20 rounded-full -mr-12 -mt-12 blur-2xl"></div>
                <h4 className="text-sm font-bold mb-4 flex items-center gap-2">
                  <span className="text-lg">✨</span> Huy hiệu bài học
                </h4>
                <div className="flex gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30">
                    {badge}
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/20">
                    🔒
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <button className="fixed bottom-8 right-8 w-14 h-14 bg-white shadow-2xl rounded-full flex items-center justify-center text-primary border border-primary-container hover:scale-110 transition-transform group">
        <HelpCircle className="w-6 h-6" />
        <span className="absolute right-16 bg-white px-4 py-2 rounded-2xl shadow-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity text-slate-600">Hỏi Trợ lý AI</span>
      </button>
    </div>
  );
};

const BookOpenIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253" /></svg>;

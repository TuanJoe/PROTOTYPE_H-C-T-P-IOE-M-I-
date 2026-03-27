import React from 'react';
import { Search, Bell, Flame, User, BookOpen } from 'lucide-react';

export const Navbar: React.FC<{ activeTab: string; setActiveTab: (tab: string) => void }> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="bg-white fixed top-0 left-0 right-0 z-50 border-b border-slate-100 shadow-sm">
      <div className="flex justify-between items-center w-full px-8 h-20 max-w-7xl mx-auto">
        <div className="flex items-center gap-12">
          <span className="text-2xl font-black text-sky-500 tracking-tight font-headline">Học cùng IOE</span>
          <nav className="hidden md:flex items-center gap-8 font-headline text-sm font-bold">
            <button 
              onClick={() => setActiveTab('home')}
              className={`${activeTab === 'home' ? 'text-sky-500 border-b-2 border-sky-500' : 'text-slate-400'} hover:text-sky-500 transition-all pb-1`}
            >
              Trang chủ
            </button>
            <button 
              onClick={() => setActiveTab('path')}
              className={`${activeTab === 'path' ? 'text-sky-500 border-b-2 border-sky-500' : 'text-slate-400'} hover:text-sky-500 transition-all pb-1`}
            >
              Lộ trình học
            </button>
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`${activeTab === 'dashboard' ? 'text-sky-500 border-b-2 border-sky-500' : 'text-slate-400'} hover:text-sky-500 transition-all pb-1`}
            >
              Phân tích dữ liệu học tập
            </button>
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center bg-slate-50 px-4 py-2 rounded-full w-64 border border-slate-100">
            <Search className="text-slate-300 w-4 h-4" />
            <input className="bg-transparent border-none focus:ring-0 text-xs w-full ml-2 text-slate-600" placeholder="Tìm khóa học..." />
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-orange-50 rounded-full transition-all text-orange-400">
              <Flame className="w-5 h-5 fill-current" />
            </button>
            <button className="p-2 hover:bg-blue-50 rounded-full transition-all text-blue-400">
              <Bell className="w-5 h-5" />
            </button>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden border border-slate-200 shadow-sm">
            <img src="https://picsum.photos/seed/student/100/100" alt="Avatar" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </header>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-100 pt-20 pb-10 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <span className="font-black text-sky-500 text-2xl font-headline mb-6 block">Học cùng IOE</span>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Nền tảng học tiếng Anh trực tuyến hàng đầu cho học sinh K12 tại Việt Nam. Giúp các em tiếp cận phương pháp học tập hiện đại và hiệu quả nhất.
            </p>
            <div className="flex gap-4 mt-8">
              {['🌐', '📘', '📺', '📸'].map((icon, i) => (
                <div key={i} className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-lg cursor-pointer hover:bg-sky-50 transition-colors">
                  {icon}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-slate-800 mb-6">Khám phá</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><a href="#" className="hover:text-sky-500 transition-colors">Thi chính thức</a></li>
              <li><a href="#" className="hover:text-sky-500 transition-colors">Thi thử</a></li>
              <li><a href="#" className="hover:text-sky-500 transition-colors">Thử thách</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-800 mb-6">Hỗ trợ</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><a href="#" className="hover:text-sky-500 transition-colors">Hướng dẫn</a></li>
              <li><a href="#" className="hover:text-sky-500 transition-colors">Hỏi đáp</a></li>
              <li><a href="#" className="hover:text-sky-500 transition-colors">Liên hệ</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-300">© 2024 Học cùng IOE. Tất cả quyền được bảo lưu.</p>
          <p className="text-xs text-slate-300">Phát triển bởi các chuyên gia giáo dục hàng đầu.</p>
        </div>
      </div>
    </footer>
  );
};
